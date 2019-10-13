import { RecAction, ParsedEvent } from '../types/types';
import eventTypes from '../constants/events';
import finder from '@medv/finder';

let port: chrome.runtime.Port;

function initialize(): void {
  console.log('eventRecorder initialized');
  port = chrome.runtime.connect({ name: 'eventRecorderConnection' });
  port.onMessage.addListener(handleControlMessages);
  addDOMListeners();
}

function handleControlMessages(action: RecAction): void {
  switch (action.type) {
    case 'startRec':
      addDOMListeners();
      break;
    case 'stopRec':
      removeDOMListeners();
      break;
    case 'resetRec':
      break;
    default:
      throw new Error(`Unexpected control message type ${action}`);
  }
}

function handleEvent(event: Event): void {
  console.dir(event);
  const selector = finder(event.target as Element);
  console.log(selector);
  const parsedEvent: ParsedEvent = {
    selector,
    action: event.type,
    id: (event.target as Element).id,
  };
  port.postMessage(parsedEvent);
}

function addDOMListeners(): void {
  Object.values(eventTypes).forEach(eventType => {
    document.addEventListener(eventType, handleEvent, {
      capture: true,
      passive: true,
    });
  });
}

function removeDOMListeners(): void {
  Object.values(eventTypes).forEach(eventType => {
    document.removeEventListener(eventType, handleEvent, { capture: true });
  });
}

initialize();
