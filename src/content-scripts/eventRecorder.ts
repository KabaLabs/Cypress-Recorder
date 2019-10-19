/**
 * Where the magic happens.
 *
 * Responsible for recording the DOM events.
 */

import finder from '@medv/finder';
import { ParsedEvent } from '../types';
import { EventType } from '../constants';

console.log("Hello from the content-script")

let port: chrome.runtime.Port;


/**
 * Parses DOM events into an object with the necessary data.
 *
 * @param {Event} event
 * @returns {ParsedEvent}
 */
function parseEvent(event: Event): ParsedEvent {
  console.log(event);
  let selector: string;
  if ((event.target as Element).hasAttribute('data-cy')) selector = `[data-cy=${(event.target as Element).getAttribute('data-cy')}]`;
  else if ((event.target as Element).hasAttribute('data-test')) selector = `[data-test=${(event.target as Element).getAttribute('data-test')}]`;
  else if ((event.target as Element).hasAttribute('data-testid')) selector = `[data-testid=${(event.target as Element).getAttribute('data-testid')}]`;
  else selector = finder(event.target as Element);
  const parsedEvent: ParsedEvent = {
    selector,
    action: event.type,
    tag: (event.target as Element).tagName,
    value: (event.target as HTMLInputElement).value,
  };
  if ((event.target as HTMLAnchorElement).hasAttribute('href')) parsedEvent.href = (event.target as HTMLAnchorElement).href;
  if ((event.target as Element).hasAttribute('id')) parsedEvent.id = (event.target as Element).id;
  if (parsedEvent.tag === 'INPUT') parsedEvent.inputType = (event.target as HTMLInputElement).type;
  if (event.type === 'keydown') parsedEvent.key = (event as KeyboardEvent).key;
  return parsedEvent;
}

/**
 * Handles DOM events.
 *
 * @param {Event} event
 */
function handleEvent(event: Event): void {
  if (event.isTrusted === true) port.postMessage(parseEvent(event));
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

/* 
  set up quick key commands
*/

function setUpKeys() {
  console.log("setting up quick keys")
  let recording = 0;
  document.onkeyup = function(e) {
    if (!recording && (e.shiftKey && e.code === 'Space')) {
      recording = 1;
      alert('youre recording');
    } else if (recording === 1 && (e.shiftKey && e.code === 'Space')) {
      recording = 2;
      alert('stopped recording');
    }
    if (recording === 2 && (e.ctrlKey && e.code === 'Space')) {
      recording = 0;
      alert('resetting recording results');
    }; 
  };
}

/**
 * Initializes the event recorder.
 */
function initialize(): void {
  console.log("initializing all our things")
  port = chrome.runtime.connect();
  port.onDisconnect.addListener(removeDOMListeners);
  addDOMListeners();
  setUpKeys();
}

initialize();
