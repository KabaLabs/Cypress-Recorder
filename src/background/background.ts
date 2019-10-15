import { generateCode } from '../helpers/codeGenerator';
import { RecAction, RecordedSession, ParsedEvent } from '../types/types';

let port: chrome.runtime.Port;

const session: RecordedSession = {
  events: [],
};

function handleEvents(event: ParsedEvent): void {
  console.dir(event);
  session.events.push(event);
}

function handleNewConnection(portToEventRecorder: chrome.runtime.Port): void {
  port = portToEventRecorder;
  session.sender = port.sender;
  port.onMessage.addListener(handleEvents);
}

function injectEventRecorder(): void {
  chrome.tabs.executeScript({ file: '/content-scripts/eventRecorder.js', allFrames: true });
}

function ejectEventRecorder(): void {
  port.disconnect();
}

function startRecording(): void {
  console.log('startRecording');
  chrome.webNavigation.onBeforeNavigate.addListener(ejectEventRecorder);
  chrome.webNavigation.onCompleted.addListener(injectEventRecorder);
  injectEventRecorder();
}

function stopRecording(): void {
  console.log('stopRecording');
  chrome.webNavigation.onBeforeNavigate.removeListener(ejectEventRecorder);
  chrome.webNavigation.onCompleted.removeListener(injectEventRecorder);
  ejectEventRecorder();
}

function resetRecording(): void {
  session.events = [];
}

function handleControlAction(action: RecAction, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
  switch (action.type) {
    case 'startRec':
      startRecording();
      break;
    case 'stopRec':
      stopRecording();
      const code = generateCode(session);
      sendResponse(code);
      chrome.storage.local.set({ codeBlocks: code });
      break;
    case 'resetRec':
      resetRecording();
      break;
    default:
      throw new Error('Invalid action type');
  }
}

function cleanUp(): void {
  chrome.storage.local.set({ status: 'off' });
}

function initialize(): void {
  chrome.runtime.onStartup.addListener(cleanUp);
  chrome.runtime.onMessage.addListener(handleControlAction);
  chrome.runtime.onConnect.addListener(handleNewConnection);
  chrome.runtime.onSuspend.addListener(cleanUp);
}

initialize();
