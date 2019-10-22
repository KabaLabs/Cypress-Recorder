/**
 * The background script which is always runnin'.
 *
 * Serves as the router and controller for the extension; the popup sends messages to the background
 * and the background sets up the event recording and code generation and serves the resulting code
 * back to the popup for display to the user.
 */

import { generateBlock, generateVisit } from '../helpers/codeGenerator';
import {
  RecordedSession,
  ParsedEvent,
  BackgroundStatus,
  RecState,
} from '../types';
import { ControlAction } from '../constants';

const backgroundStatus: BackgroundStatus = {
  isPending: true,
  recStatus: 'off',
};

const session: RecordedSession = {
  processedCode: [],
  host: null,
};

let activePort: chrome.runtime.Port | null = null;

/**
 * Injects the event recorder into the active tab.
 */
function injectEventRecorder(
  details?: chrome.webNavigation.WebNavigationFramedCallbackDetails,
): Promise<void> {
  console.log('injectEventRecorder', details);
  return new Promise((resolve, reject) => {
    if (!details || details.frameId === 0) {
      chrome.tabs.executeScript({ file: '/content-scripts/eventRecorder.js' }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve();
      });
    } else resolve();
  });
}

/**
 * Disconnects the event recorder.
 */
function ejectEventRecorder(
  details?: chrome.webNavigation.WebNavigationParentedCallbackDetails,
): void {
  console.log('ejectEventRecorder', details);
  if (activePort && (!details || details.frameId === 0)) activePort.disconnect();
}

/**
 * Handles events sent from the event recorder.
 *
 * @param {ParsedEvent} event
 */
function handleEvents(event: ParsedEvent): void {
  console.log('handleEvents');
  const block = generateBlock(event);
  if (block !== null) {
    session.processedCode.push(block);
    chrome.storage.local.set({ codeBlocks: session.processedCode }, () => {
      chrome.runtime.sendMessage(block);
    });
  }
}

function handleFirstConnection(): void {
  chrome.webNavigation.onBeforeNavigate.addListener(ejectEventRecorder);
  chrome.webNavigation.onDOMContentLoaded.addListener(
    injectEventRecorder,
    { url: [{ hostEquals: activePort.name }] },
  );
  session.host = activePort.sender.url;
  const firstLineOfCode = generateVisit(session.host);
  session.processedCode.push(firstLineOfCode);
  chrome.storage.local.set({ codeBlocks: session.processedCode }, () => {
    chrome.runtime.sendMessage(firstLineOfCode);
  });
}

/**
 * Handles any new connections from event recorders.
 *
 * Event recorders will open new connections upon injection into their tab;
 * upon establishing this connection, we need to listen to any new messages on this port;
 * this is how the event recorder sends the background information.
 *
 * @param {chrome.runtime.Port} portToEventRecorder
 */
function handleNewConnection(portToEventRecorder: chrome.runtime.Port): void {
  console.log('handleNewConnection', portToEventRecorder);
  activePort = portToEventRecorder;
  activePort.onMessage.addListener(handleEvents);
  if (!session.host) handleFirstConnection();
}

/**
 * Starts the recording process by injecting the event recorder into the active tab.
 */
function startRecording(): Promise<void> {
  console.log('startRecording');
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ status: 'on' }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      injectEventRecorder()
        .then(() => resolve())
        .catch(err => reject(err));
    });
  });
}

/**
 * Stops recording and sends back code to the view.
 *
 * @param {Function} sendResponse
 */
function stopRecording(): Promise<void> {
  console.log('stopRecording');
  return new Promise((resolve, reject) => {
    ejectEventRecorder();
    chrome.webNavigation.onDOMContentLoaded.removeListener(injectEventRecorder);
    chrome.webNavigation.onBeforeNavigate.removeListener(ejectEventRecorder);
    chrome.storage.local.set({ codeBlocks: session.processedCode, status: 'done' }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      session.processedCode = [];
      session.host = null;
      activePort = null;
      chrome.browserAction.setIcon({ path: 'cypressconeICON.png' })
      resolve();
    });
  });
}

/**
 * Performs necessary cleanup between sessions.
 */
function cleanUp(): Promise<void> {
  console.log('cleanUp');
  return new Promise((resolve, reject) => {
    ejectEventRecorder();
    chrome.storage.local.set({ status: 'off', codeBlocks: [] }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      resolve();
    });
  });
}

/**
 * Handles control messages sent from the view (popup) and conducting the appropriate actions.
 *
 * @param {ControlAction} action
 * @param {chrome.runtime.MessageSender} sender
 * @param {Function} sendResponse
 */
function handleControlAction(action: ControlAction): Promise<RecState> {
  console.log('handleControlAction', action);
  return new Promise((resolve, reject) => {
    switch (action) {
      case ControlAction.START:
        startRecording()
          .then(() => resolve('on'))
          .catch(err => reject(err));
        break;
      case ControlAction.STOP:
        stopRecording()
          .then(() => resolve('done'))
          .catch(err => reject(err));
        break;
      case ControlAction.RESET:
        cleanUp()
          .then(() => resolve('off'))
          .catch(err => reject(err));
        break;
      default:
        throw new Error(`Invalid action: ${action}`);
    }
  });
}

function handleStateChange(action: ControlAction): Promise<void> {
  return new Promise((resolve, reject) => {
    if (backgroundStatus.isPending) reject();
    else {
      backgroundStatus.isPending = true;
      handleControlAction(action)
        .then(newStatus => {
          backgroundStatus.recStatus = newStatus;
          backgroundStatus.isPending = false;
          resolve();
        })
        .catch(err => reject(err));
    }
  });
}

/*
  quick key initiator function
*/
function handleQuickKeys(command: string): void {
  let action: ControlAction;
  console.log("this is the command", command);
  if (command === 'start-recording' && backgroundStatus.recStatus === 'off') action = ControlAction.START;
  else if (command === 'start-recording' && backgroundStatus.recStatus === 'on') action = ControlAction.STOP;
  else if (command === 'reset-recording' && backgroundStatus.recStatus === 'done') action = ControlAction.RESET;
  if (action !== undefined) {
    handleStateChange(action)
      .then(() => {
        chrome.runtime.sendMessage(action);
      })
      .catch(err => {
        throw new Error(`handleQuickKeys: ${err}`);
      });
  }
}

function suspend() {
  console.log('suspend');
  cleanUp();
}

function install() {
  console.log('install');
  cleanUp();
} 

/**
 * Initializes the extension.
 */
function initialize(): void {
  console.log('initialize');
  cleanUp()
    .then(() => {
      backgroundStatus.isPending = false;
    });
  chrome.runtime.onMessage.addListener(handleStateChange);
  chrome.runtime.onConnect.addListener(handleNewConnection);
  chrome.commands.onCommand.addListener(handleQuickKeys);
  chrome.runtime.onSuspend.addListener(suspend);
  chrome.runtime.onInstalled.addListener(install);
}

initialize();
