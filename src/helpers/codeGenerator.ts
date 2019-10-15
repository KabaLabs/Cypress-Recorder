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

function generateBlock(event: ParsedEvent): CodeBlock {
  // place in correct area
  console.log('event', event);
  // takes events object and translates it to block(s) of code (as a string)
  switch (event.action) {
    case 'click':
      return `cy.get('${event.selector}').click()`;
    case 'keydown':
      switch(event.key) {
        case '13': // enter key
          return `cy.get('${event.selector}').type({${event.key}})`;
        case '9': // tab
        return `cy.get('${event.selector}').type({${event.key}})`;
      }
      return `cy.get('${event.selector}').type('${event.key}')`;
    default:
      console.error('didn\'t match any types');
  }
  // return event.selector; // is this codeblock instead? returning string
}

export default function generateCode(session: RecordedSession): BlockData {
  console.log(session.sender);
  return [`cy.visit('${session.sender.url}');` as CodeBlock]
    .concat(session.events.map((event) => generateBlock(event)));
}
