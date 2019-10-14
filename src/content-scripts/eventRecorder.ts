/**
 * Where the magic happens.
 * 
 * The functions in this file are responsible for recording the DOM events.
 */

import { RecAction, ParsedEvent } from '../types/types';
import eventTypes from '../constants/events';
import finder from '@medv/finder';

let port: chrome.runtime.Port;

/**
 * Initializes event recording.
 * 
 * @see addDOMListeners
 */
function initialize(): void {
  console.log('eventRecorder initialized');
  port = chrome.runtime.connect({ name: 'eventRecorderConnection' });
  port.onMessage.addListener(handleControlMessages);
  addDOMListeners();
}

/**
 * Handles control messages from the background script.
 * 
 * @see addDOMListeners
 * @see removeDOMListeners
 * 
 * @param {RecAction} action
 */
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

/**
 * Handles DOM events.
 * 
 * @see parseEvent
 * @see addDOMListeners
 * 
 * @param {Event} event 
 */
function handleEvent(event: Event): void {
  const parsedEvent: ParsedEvent = parseEvent(event);
  port.postMessage(parsedEvent);
}

/**
 * Parses DOM events into an object with the necessary data.
 * 
 * @see handleEvent
 * 
 * @param {Event} event
 * 
 * @returns {ParsedEvent}
 */
function parseEvent(event: Event): ParsedEvent {
  const parsedEvent: ParsedEvent = {
    selector: finder(event.target as Element),
    action: event.type,
    tag: (event.target as HTMLInputElement).tagName,
    value: (event.target as HTMLInputElement).value,
  };
  if ((event.target as Element).hasAttribute('id')) parsedEvent.id = (event.target as Element).id;
  if (event.type === 'keydown') parsedEvent.keyCode = (event as KeyboardEvent).keyCode;
  return parsedEvent;
}

/**
 * Adds event listeners to the DOM.
 * 
 * @see handleControlMessages
 */
function addDOMListeners(): void {
  Object.values(eventTypes).forEach(eventType => {
    document.addEventListener(eventType, handleEvent, {
      capture: true,
      passive: true,
    });
  });
}

/**
 * Removes event listeners from the DOM.
 * 
 * @see handleControlMessages
 */
function removeDOMListeners(): void {
  Object.values(eventTypes).forEach(eventType => {
    document.removeEventListener(eventType, handleEvent, { capture: true });
  });
}

initialize();
