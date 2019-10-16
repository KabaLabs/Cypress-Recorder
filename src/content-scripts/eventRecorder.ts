/**
 * Where the magic happens.
 *
 * Responsible for recording the DOM events.
 */

import finder from '@medv/finder';
import { ParsedEvent } from '../types';
import { EventType } from '../constants';


let port: chrome.runtime.Port;

/**
 * Parses DOM events into an object with the necessary data.
 *
 * @param {Event} event
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
 * Handles DOM events.
 *
 * @param {Event} event
 */
function handleEvent(event: Event): void {
  port.postMessage(parseEvent(event));
}

/**
 * Adds event listeners to the DOM.
 */
function addDOMListeners(): void {
  Object.values(EventType).forEach(event => {
    document.addEventListener(event, handleEvent, {
      capture: true,
      passive: true,
    });
  });
}

/**
 * Removes event listeners from the DOM.
 */
function removeDOMListeners(): void {
  Object.values(EventType).forEach(event => {
    document.removeEventListener(event, handleEvent, { capture: true });
  });
}

/**
 * Initializes the event recorder.
 */
function initialize(): void {
  port = chrome.runtime.connect();
  port.onDisconnect.addListener(removeDOMListeners);
  addDOMListeners();
}

initialize();
