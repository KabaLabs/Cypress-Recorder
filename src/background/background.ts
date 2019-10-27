/**
 * The background script which is always runnin'.
 *
 * Serves as the router and controller for the extension; the popup sends messages to the background
 * and the background sets up the event recording and code generation and serves the resulting code
 * back to the popup for display to the user.
 */

import codeGenerator from '../helpers/codeGenerator';
import {
  ActionWithPayload,
  ParsedEvent,
  Session,
} from '../types';
import Model from '../helpers/model';
import { ControlAction } from '../constants';

const model = new Model();

const session: Session = {
  isPending: false,
  lastURL: '',
  originalHost: '',
  activePort: null,
};

function control(cb: (...args: any) => Promise<void>, ...args: any): void {
  if (session.isPending) return;
  session.isPending = true;
  cb(...args)
    .then(() => {
      session.isPending = false;
    })
    .catch(err => new Error(err));
}

/**
//  * Injects the event recorder into the active tab.
 */
function injectEventRecorder(
  details?: chrome.webNavigation.WebNavigationFramedCallbackDetails,
): Promise<void> {
  console.log('injectEventRecorder', details);
  return new Promise((resolve, reject) => {
    if (!details || details.frameId === 0) {
      chrome.tabs.executeScript({ file: '/content-scripts/eventRecorder.js' }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
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
  if (session.activePort && (!details || details.frameId === 0)) session.activePort.disconnect();
}

/**
 * Handles events sent from the event recorder.
 *
 * @param {ParsedEvent} event
 */
function handleEvents(event: ParsedEvent): void {
  console.log('handleEvents');
  const block = codeGenerator.createBlock(event);
  if (block !== null) {
    model.pushBlock(block)
      .then(() => chrome.runtime.sendMessage(block))
      .catch((err) => new Error(err));
  }
}

function checkForBadNavigation(
  details: chrome.webNavigation.WebNavigationTransitionCallbackDetails,
): void {
  console.log(details);
  if (details.frameId === 0
    && (!details.url.includes(session.originalHost)
      || details.transitionQualifiers.includes('forward_back')
      || details.transitionQualifiers.includes('from_address_bar'))
  ) {
    control(stopRecording);
  }
}

function handleFirstConnection(): void {
  console.log('handleFirstConnection');
  session.originalHost = session.activePort.name;
  chrome.webNavigation.onBeforeNavigate.addListener(ejectEventRecorder);
  chrome.webNavigation.onCommitted.addListener(checkForBadNavigation);
  chrome.webNavigation.onDOMContentLoaded.addListener(
    injectEventRecorder,
    { url: [{ hostEquals: session.originalHost }] },
  );
  if (session.lastURL !== session.activePort.sender.url) {
    const visitBlock = codeGenerator.createVisit(session.activePort.sender.url);
    session.lastURL = session.activePort.sender.url;
    model.pushBlock(visitBlock)
      .then(() => chrome.runtime.sendMessage(visitBlock))
      .catch(err => new Error(err));
  }
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
  session.activePort = portToEventRecorder;
  session.activePort.onMessage.addListener(handleEvents);
  if (model.status !== 'on') handleFirstConnection();
}

/**
 * Starts the recording process by injecting the event recorder into the active tab.
 */
function startRecording(): Promise<void> {
  console.log('startRecording');
  return new Promise((resolve, reject) => {
    injectEventRecorder()
      .then(() => model.updateStatus('on'))
      .then(() => {
        chrome.browserAction.setIcon({ path: 'cypressconeREC.png' });
        resolve();
      })
      .catch(err => reject(err));
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
    chrome.webNavigation.onCommitted.removeListener(checkForBadNavigation);
    chrome.webNavigation.onBeforeNavigate.removeListener(ejectEventRecorder);
    model.updateStatus('paused')
      .then(() => {
        session.activePort = null;
        session.originalHost = null;
        chrome.browserAction.setIcon({ path: 'cypressconeICON.png' });
        resolve();
      })
      .catch(err => reject(err));
  });
}

/**
 * Performs necessary cleanup between sessions.
 */
function cleanUp(): Promise<void> {
  console.log('cleanUp');
  return new Promise((resolve, reject) => {
    if (session.activePort) ejectEventRecorder();
    model.sync('off', [])
      .then(() => resolve())
      .catch(err => reject(err));
  });
}

function resetRecording(): Promise<void> {
  console.log('resetRecording');
  return new Promise((resolve, reject) => {
    cleanUp()
      .then(() => {
        session.lastURL = '';
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Handles control messages sent from the view (popup) and conducting the appropriate actions.
 *
 * @param {ControlAction} action
 */
function handleControlAction(action: ControlAction): Promise<void> {
  console.log('handleControlAction', action);
  return new Promise((resolve, reject) => {
    switch (action) {
      case ControlAction.START:
        startRecording()
          .then(() => resolve())
          .catch(err => reject(err));
        break;
      case ControlAction.STOP:
        stopRecording()
          .then(() => resolve())
          .catch(err => reject(err));
        break;
      case ControlAction.RESET:
        resetRecording()
          .then(() => resolve())
          .catch(err => reject(err));
        break;
      default:
        reject(new Error(`Invalid action: ${action}`));
    }
  });
}

function handleMessage(action: ControlAction | ActionWithPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof action === 'object') {
      model.deleteBlock(action.payload)
        .then(() => resolve())
        .catch(err => reject(err));
    } else {
      handleControlAction(action as ControlAction)
        .then(() => resolve())
        .catch(err => reject(err));
    }
  });
}

/**
 * quick key initiator function
 * @param {string} command
 */
<<<<<<< HEAD
function handleQuickKeys(command: string): void {
  let action: ControlAction;
  console.log('this is the command', command);
  if (backgroundStatus.isPending) return;
  if (command === 'start-recording' && backgroundStatus.recStatus === 'off') action = ControlAction.START;
  else if (command === 'start-recording' && backgroundStatus.recStatus === 'on') action = ControlAction.STOP;
  else if (command === 'reset-recording' && backgroundStatus.recStatus === 'done') action = ControlAction.RESET;
  if (action !== undefined) {
    handleStateChange(action)
      .then(() => {
        chrome.runtime.sendMessage(action);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}

function suspend() {
  console.log('suspend');
  cleanUp();
=======
function handleQuickKeys(command: string): Promise<void> {
  console.log('this is the command', command);
  return new Promise((resolve, reject) => {
    let action: ControlAction;
    if (command === 'start-recording') {
      if (model.status === 'off' || model.status === 'paused') action = ControlAction.START;
      else if (model.status === 'on') action = ControlAction.STOP;
    } else if (command === 'reset-recording' && model.status === 'paused') action = ControlAction.RESET;
    if (action) {
      handleControlAction(action)
        .then(() => {
          chrome.runtime.sendMessage(action);
          resolve();
        })
        .catch(err => reject(new Error(err)));
    }
  });
>>>>>>> staging
}

/**
 * Initializes the extension.
 */
function initialize(): void {
  console.log('initialize');
  chrome.runtime.onInstalled.addListener(() => control(cleanUp));
  chrome.runtime.onConnect.addListener(handleNewConnection);
  chrome.runtime.onMessage.addListener(message => control(handleMessage, message));
  chrome.commands.onCommand.addListener(command => control(handleQuickKeys, command));
  control(cleanUp);
}

initialize();
