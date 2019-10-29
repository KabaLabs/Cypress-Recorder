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
 * Injects the event recorder into the active tab.
 */
function injectEventRecorder(
  details?: chrome.webNavigation.WebNavigationFramedCallbackDetails,
): Promise<void> {
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
  const block = codeGenerator.createBlock(event);
  if (block !== null) {
    model.pushBlock(block)
      .catch(err => new Error(err));
  }
}

function checkForBadNavigation(
  details: chrome.webNavigation.WebNavigationTransitionCallbackDetails,
): void {
  if (details.frameId === 0
    && (!details.url.includes(session.originalHost)
      || details.transitionQualifiers.includes('forward_back')
      || details.transitionQualifiers.includes('from_address_bar'))
  ) {
    control(stopRecording);
  }
}

function handleFirstConnection(): void {
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
  session.activePort = portToEventRecorder;
  session.activePort.onMessage.addListener(handleEvents);
  if (model.status !== 'on') handleFirstConnection();
}

/**
 * Starts the recording process by injecting the event recorder into the active tab.
 */
function startRecording(): Promise<void> {
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

function resetRecording(): Promise<void> {
  return new Promise((resolve, reject) => {
    session.lastURL = '';
    model.reset()
      .then(() => resolve())
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Performs necessary cleanup between sessions.
 */
function cleanUp(): Promise<void> {
  return new Promise((resolve, reject) => {
    ejectEventRecorder();
    chrome.browserAction.setIcon({ path: 'cypressconeICON.png' });
    model.sync()
      .then(() => resolve())
      .catch(err => reject(err));
  });
}

/**
 * Handles control messages sent from the view (popup) and conducting the appropriate actions.
 *
 * @param {ControlAction} action
 */
function handleControlAction(action: ControlAction): Promise<void> {
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

function handleMessage(action: ActionWithPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    if (action.type === ControlAction.DELETE) {
      model.deleteBlock(action.payload)
        .then(() => resolve())
        .catch(err => reject(err));
    } else if (action.type === ControlAction.MOVE) {
      model.moveBlock(action.payload.dragIdx, action.payload.dropIdx)
        .then(() => resolve())
        .catch(err => reject(err));
    } else {
      handleControlAction(action.type)
        .then(() => resolve())
        .catch(err => reject(err));
    }
  });
}

/**
 * quick key initiator function
 * @param {string} command
 */
function handleQuickKeys(command: string): Promise<void> {
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
}

/**
 * Initializes the extension.
 */
function initialize(): void {
  chrome.runtime.onInstalled.addListener(() => control(cleanUp));
  chrome.runtime.onConnect.addListener(handleNewConnection);
  chrome.runtime.onMessage.addListener(message => control(handleMessage, message));
  chrome.commands.onCommand.addListener(command => control(handleQuickKeys, command));
  control(cleanUp);
}

initialize();
