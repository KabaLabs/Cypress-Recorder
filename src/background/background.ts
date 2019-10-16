/**
 * The background script which is always runnin'.
 *
 * Serves as the router and controller for the extension; the popup sends messages to the background
 * and the background sets up the event recording and code generation and serves the resulting code
 * back to the popup for display to the user.
 */

import generateCode from '../helpers/codeGenerator';
import {
  RecAction,
  RecordedSession,
  ParsedEvent,
  BlockData,
} from '../types';

const session: RecordedSession = {
  events: [],
  sender: null,
};

let port: chrome.runtime.Port;

/**
 * Handles events sent from the event recorder.
 *
 * @param {ParsedEvent} event
 */
function handleEvents(event: ParsedEvent): void {
  session.events.push(event);
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
  port = portToEventRecorder;
  if (!session.sender) session.sender = port.sender;
  port.onMessage.addListener(handleEvents);
}

/**
 * Injects the event recorder into the active tab.
 */
function injectEventRecorder(): void {
  chrome.tabs.executeScript({ file: '/content-scripts/eventRecorder.js', allFrames: true });
}

/**
 * Disconnects the event recorder.
 */
function ejectEventRecorder(): void {
  port.disconnect();
}

/**
 * Starts the recording process by injecting the event recorder into the active tab.
 */
function startRecording(): void {
  chrome.webNavigation.onBeforeNavigate.addListener(ejectEventRecorder);
  chrome.webNavigation.onCompleted.addListener(injectEventRecorder);
  injectEventRecorder();
}

/**
 * Stops recording and sends back code to the view.
 *
 * @param {Function} sendResponse
 */
function stopRecording(sendResponse: (response: BlockData) => void): void {
  ejectEventRecorder();
  chrome.webNavigation.onBeforeNavigate.removeListener(ejectEventRecorder);
  chrome.webNavigation.onCompleted.removeListener(injectEventRecorder);
  const code = generateCode(session);
  sendResponse(code);
  chrome.storage.local.set({ codeBlocks: code });
  resetRecording();
}

/**
 * Resets the recording process.
 */
function resetRecording(): void {
  session.events = [];
  session.sender = null;
}

/**
 * Handles control messages sent from the view (popup) and conducting the appropriate actions.
 *
 * @param {RecAction} action
 * @param {chrome.runtime.MessageSender} sender
 * @param {Function} sendResponse
 */
function handleControlAction(
  action: RecAction,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: BlockData) => void,
): void {
  switch (action.type) {
    case 'startRec':
      startRecording();
      break;
    case 'stopRec':
      stopRecording(sendResponse);
      break;
    case 'resetRec':
      resetRecording();
      break;
    default:
      throw new Error('Invalid action type');
  }
}

/**
 * Performs necessary cleanup on startup and suspend.
 */
function cleanUp(): void {
  chrome.storage.local.set({ status: 'off' });
  chrome.storage.local.set({ codeBlocks: [] });
}

/**
 * Initializes the extension.
 */
function initialize(): void {
  cleanUp();
  chrome.runtime.onMessage.addListener(handleControlAction);
  chrome.runtime.onConnect.addListener(handleNewConnection);
  chrome.runtime.onSuspend.addListener(cleanUp);
}

initialize();
