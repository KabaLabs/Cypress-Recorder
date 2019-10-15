/**
 * Code Generator is the function that actually generates the Cypress code that will simulate 
 * the recorded user session.
 * 
 * Each time the user records, this function will generate:
 * - a 'describe' function block with a placeholder for the user to title their test. It contains:
 * - an 'it' function block with a placeholder for a description of the interactions taking place. It contains:
 * - a cy.visit command for the current url
 * - each subsequest user interaction with the browser, e.g. (cy.get('element').click)
 */

 /**
  * SAMPLE CODE:
  * cy.get('.action-email')
    .type('fake@email.com').should('have.value', 'fake@email.com')
    
    cy.get('.action-btn').click() <= you can pass coordinates in

    cy.get('.action-form')
    .find('[type="text"]').type('HALFOFF')
    cy.get('.action-form').submit()
    .next().should('contain', 'Your form has been submitted!')
  */
import { RecordedSession, ParsedEvent, BlockData, CodeBlock } from '../types';
import { EventType } from '../constants';

// write helper functions to handle each action type
function handleClick(event: ParsedEvent): CodeBlock {
  return `cy.get('${event.selector}').click()`;
}

function handleKeydown(event: ParsedEvent): CodeBlock {
  console.log('keydown handled');
  switch (event.key) {
    case 'Enter':
      return `cy.get('${event.selector}').type({enter})`;
    case 'Backspace':
      return `cy.get('${event.selector}').type({backspace})`;
    case 'Shift':
      return `cy.get('${event.selector}').type({shift})`;
    case 'Escape':
      return `cy.get('${event.selector}').type({esc})`;
    case 'Alt':
      return `cy.get('${event.selector}').type({alt})`;
    case 'Control':
      return `cy.get('${event.selector}').type({ctrl})`;
    case 'ArrowUp':
      return `cy.get('${event.selector}').type({uparrow})`;
    case 'ArrowRight':
      return `cy.get('${event.selector}').type({rightarrow})`;
    case 'ArrowDown':
      return `cy.get('${event.selector}').type({downarrow})`;
    case 'ArrowLeft':
      return `cy.get('${event.selector}').type({leftarrow})`;
    default:
      return `cy.get('${event.selector}').type('${event.key}')`;
  }
}

function handleChange(event: ParsedEvent): CodeBlock {
  console.log(`Change handled; value: ${event.value}`);
  return `we changin in here ${event.value}`;
}

function handleDoubleclick(event: ParsedEvent): CodeBlock {
  console.log('handling doubleclick');
  return 'doubleclick';
}

function handleReset(event: ParsedEvent): CodeBlock {
  console.log(`handling reset, ${event.value}`);
  return 'reset';
}

function handleSubmit(event: ParsedEvent): CodeBlock {
  console.log(`handling submit, ${event.value}`);
  return 'submit';
}

function generateBlock(event: ParsedEvent): CodeBlock {
  // place in correct area
  console.log('event', event);
  // takes events object and translates it to block(s) of code (as a string)
  switch (event.action) {
    case EventType.CLICK:
      return handleClick(event);
    case EventType.KEYDOWN:
      return handleKeydown(event);
    case EventType.CHANGE:
      return handleChange(event);
    case EventType.DBCLICK:
      return handleDoubleclick(event);
    case EventType.RESET:
      return handleReset(event);
    case EventType.SUBMIT:
      return handleSubmit(event);
    default:
      throw new Error(`Unhandled event: ${event.action}`);
  }
  // return event.selector; // is this codeblock instead? returning string
}

export default function generateCode(session: RecordedSession): BlockData {
  return [`cy.visit('${session.sender.url}');` as CodeBlock]
    .concat(session.events.map(event => generateBlock(event)));
}
