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

  