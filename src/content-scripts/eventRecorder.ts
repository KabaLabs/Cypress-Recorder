/**
 * Where the magic happens.
 * 
 * The functions in this file are responsible for recording the DOM events.
 */

import { ParsedEvent } from '../types/types';
import eventTypes from '../constants/events';
import finder from '@medv/finder';

let port: chrome.runtime.Port;

function initialize(): void {
  console.log('eventRecorder initialized');
  port = chrome.runtime.connect({ name: 'eventRecorderConnection' });
  port.onDisconnect.addListener(removeDOMListeners);
  addDOMListeners();
}

/**
 * Handles DOM events.
 * 
 * @see parseEvent
 * 
 * @param {Event} event
 */
function handleEvent(event: Event): void {
  console.log(event);
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
  if ((event.target as HTMLAnchorElement).hasAttribute('href')) parsedEvent.href = (event.target as HTMLAnchorElement).href;
  if ((event.target as Element).hasAttribute('id')) parsedEvent.id = (event.target as Element).id;
  if (event.type === 'keydown') parsedEvent.key = (event as KeyboardEvent).key;
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
