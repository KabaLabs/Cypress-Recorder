/**
 * Actually generates the Cypress code that will simulate the recorded user session.
 *
 * Each time the user records, this function will generate a cy.visit command that will
 * store the current url, as well each subsequest user interaction with the browser.
 */

import { RecordedSession, ParsedEvent, BlockData, CodeBlock } from '../types';
import { EventType } from '../constants';

/**
 * Helper functions that handle each action type.
 * @param event 
 */

function handleClick(event: ParsedEvent): CodeBlock {
  return `cy.get('${event.selector}').click();`;
}

function handleKeydown(event: ParsedEvent): CodeBlock | null {
  console.log('keydown handled');
  switch (event.key) {
    case 'Backspace':
      return `cy.get('${event.selector}').type({backspace});`;
    case 'Escape':
      return `cy.get('${event.selector}').type({esc});`;
    case 'ArrowUp':
      return `cy.get('${event.selector}').type({uparrow});`;
    case 'ArrowRight':
      return `cy.get('${event.selector}').type({rightarrow});`;
    case 'ArrowDown':
      return `cy.get('${event.selector}').type({downarrow});`;
    case 'ArrowLeft':
      return `cy.get('${event.selector}').type({leftarrow});`;
    case 'Enter':
      return null;
    case 'Shift':
      return null;
    case 'Alt':
      return null;
    case 'Control':
      return null;
    default:
      return null;
  }
}

function handleChange(event: ParsedEvent): CodeBlock {
  console.log(`Change handled; value: ${event.value}`);
  return `cy.get('${event.selector}').type('${event.value}');`;
}

function handleDoubleclick(event: ParsedEvent): CodeBlock {
  console.log(`handling doubleclick, ${event.selector}`);
  return `cy.get('${event.selector}').dblclick();`;
}

function handleSubmit(event: ParsedEvent): CodeBlock {
  console.log(`handling submit, ${event.value}`);
  return `cy.get('${event.selector}').submit();`;
}

/**
 * Generates a line of Cypress code that replicates an action by a user.
 * @param event 
 */
function generateBlock(event: ParsedEvent): CodeBlock {
  console.log('event', event);
  switch (event.action) {
    case EventType.CLICK:
      return handleClick(event);
    case EventType.KEYDOWN:
      return handleKeydown(event);
    case EventType.CHANGE:
      return handleChange(event);
    case EventType.DBCLICK:
      return handleDoubleclick(event);
    case EventType.SUBMIT:
      return handleSubmit(event);
    default:
      throw new Error(`Unhandled event: ${event.action}`);
  }
}

// function generateTopWrapper(url: string): BlockData {
//   return [
//     `describe('End-to-end testing', function() {`,
//     `\tbeforeEach(function () {`,
//     `\t\tcy.visit('${url}');`,
//     `\t});`,
//     `\tit('Works as expected', function() {`,
//   ];
// }

// function generateBottomWrapper(): BlockData {
//   return [
//     '\t});',
//     '});',
//   ];
// }

/**
 * Exports array of all Cypress commands.
 * @param session 
 */
export default function generateCode(session: RecordedSession): BlockData {
  return [`cy.visit('${session.sender.url}');` as CodeBlock]
    .concat(session.events.map(event => generateBlock(event))
    .filter(block => block !== null));
}
