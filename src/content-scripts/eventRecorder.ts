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
 * Reverse lookup the event.target to discover if it was an HTMLAnchorElement that was clicked
 * @param target: HTMLElement
 * @param originalTarget: HTMLElement
 * @returns {HTMLElement}
 */
function parseEventTarget(target, originalTarget) {
  if ((target as HTMLAnchorElement).hasAttribute('href')) {
    return target;
  } else {
    if (target.parentElement) {
      return parseEventTarget(target.parentElement, originalTarget);
    } else {
      return originalTarget;
    }
  }
}

/**
 * Parses DOM events into an object with the necessary data.
 * @param event
 * @returns {ParsedEvent}
 */
function parseEvent(event: Event): ParsedEvent {
  let selector: string;
  var newTarget = parseEventTarget(event.target, event.target);
  console.log("the target", newTarget);
  if ((newTarget as Element).hasAttribute('data-cy')) selector = `[data-cy=${(newTarget as Element).getAttribute('data-cy')}]`;
  else if ((newTarget as Element).hasAttribute('data-test')) selector = `[data-test=${(newTarget as Element).getAttribute('data-test')}]`;
  else if ((newTarget as Element).hasAttribute('data-testid')) selector = `[data-testid=${(newTarget as Element).getAttribute('data-testid')}]`;
  else selector = finder(newTarget as Element);
  const parsedEvent: ParsedEvent = {
    selector,
    action: event.type,
    tag: (newTarget as Element).tagName,
    value: (newTarget as HTMLInputElement).value,
  };
  if ((newTarget as HTMLAnchorElement).hasAttribute('href')) parsedEvent.href = (newTarget as HTMLAnchorElement).href;
  if ((newTarget as Element).hasAttribute('id')) parsedEvent.id = (newTarget as Element).id;
  if (parsedEvent.tag === 'INPUT') parsedEvent.inputType = (newTarget as HTMLInputElement).type;
  if (event.type === 'keydown') parsedEvent.key = (event as KeyboardEvent).key;
  return parsedEvent;
}

/**
 * Checks if DOM event was triggered by user; if so, it calls parseEvent on the data.
 * @param event
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

/**
 * Initializes the event recorder.
 */
function initialize(): void {
  port = chrome.runtime.connect({ name: window.location.hostname });
  port.onDisconnect.addListener(removeDOMListeners);
  addDOMListeners();
}

initialize();
