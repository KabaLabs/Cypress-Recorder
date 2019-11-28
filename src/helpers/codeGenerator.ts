/**
 * Generates the Cypress code that will simulate the recorded user session.
 *
 * Each time the user records, this function will generate a cy.visit command that will
 * store the current url, as well each subsequest user interaction with the browser.
 */
import { ParsedEvent } from '../types';
import { EventType } from '../constants';

/**
 * Helper functions that handle each action type.
 * @param event
 */

function handleClick(event: ParsedEvent): string {
  return `cy.get('${event.selector}').click();`;
}

function handleKeydown(event: ParsedEvent): string | null {
  switch (event.key) {
    case 'Backspace':
      return `cy.get('${event.selector}').type('{backspace}');`;
    case 'Escape':
      return `cy.get('${event.selector}').type('{esc}');`;
    case 'ArrowUp':
      return `cy.get('${event.selector}').type('{uparrow}');`;
    case 'ArrowRight':
      return `cy.get('${event.selector}').type('{rightarrow}');`;
    case 'ArrowDown':
      return `cy.get('${event.selector}').type('{downarrow}');`;
    case 'ArrowLeft':
      return `cy.get('${event.selector}').type('{leftarrow}');`;
    default:
      return null;
  }
}

function handleChange(event: ParsedEvent): string {
  if (event.inputType === 'checkbox' || event.inputType === 'radio') return null;
  return `cy.get('${event.selector}').type('${event.value.replace(/'/g, "\\'")}');`;
}

function handleDoubleclick(event: ParsedEvent): string {
  return `cy.get('${event.selector}').dblclick();`;
}

function handleSubmit(event: ParsedEvent): string {
  return `cy.get('${event.selector}').submit();`;
}

const createBlock = (event: ParsedEvent): string => {
  switch (event.action) {
    case EventType.CLICK:
      return handleClick(event);
    case EventType.KEYDOWN:
      return handleKeydown(event);
    case EventType.CHANGE:
      return handleChange(event);
    case EventType.DBLCLICK:
      return handleDoubleclick(event);
    case EventType.SUBMIT:
      return handleSubmit(event);
    default:
      throw new Error(`Unhandled event: ${event.action}`);
  }
};

function* codeGenerator(url: string): Generator<string, null, ParsedEvent> {
  let block: string = `cy.visit('${url}');`;
  let event: ParsedEvent = yield block;
  while (event) {
    block = createBlock(event);
    event = yield block;
  }
  return null;
}

export default codeGenerator;
