/**
 * Generates the Cypress code that will simulate the recorded user session.
 *
 * Each time the user records, this function will generate a cy.visit command that will
 * store the current url, as well each subsequent user interaction with the browser.
 */
import type { ParsedEvent } from '../types';
import { EventType } from '../constants';
import { getPatternMethod } from './pattern';

/**
 * Helper functions that handle each action type.
 * @param event
 */

function handleClick(event: ParsedEvent): Promise<string> {
  return new Promise((resolve, reject) => {
    getPatternMethod()
      .then((method) => resolve(`cy.${method}('${event.selector}').click();`))
      .catch(err => {
        reject(err);
      });
  });
}

function handleKeydown(event: ParsedEvent): Promise<string | null> {
  return new Promise((resolve, reject) => {
    getPatternMethod()
      .then((method) => {
        switch (event.key) {
          case 'Backspace':
            resolve(`cy.${method}('${event.selector}').type('{backspace}');`);
          case 'Escape':
            resolve(`cy.${method}('${event.selector}').type('{esc}');`);
          case 'ArrowUp':
            resolve(`cy.${method}('${event.selector}').type('{uparrow}');`);
          case 'ArrowRight':
            resolve(`cy.${method}('${event.selector}').type('{rightarrow}');`);
          case 'ArrowDown':
            resolve(`cy.${method}('${event.selector}').type('{downarrow}');`);
          case 'ArrowLeft':
            resolve(`cy.${method}('${event.selector}').type('{leftarrow}');`);
          default:
            resolve(null);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

function handleChange(event: ParsedEvent): Promise<string> {
  return new Promise((resolve, reject) => {
    getPatternMethod()
      .then((method) => {
        if (event.inputType === 'checkbox' || event.inputType === 'radio') resolve(null);
        resolve(`cy.${method}('${event.selector}').type('${event.value.replace(/'/g, "\\'")}');`);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function handleDoubleclick(event: ParsedEvent): Promise<string> {
  return new Promise((resolve, reject) => {
    getPatternMethod()
      .then((method) => {
        resolve(`cy.${method}('${event.selector}').dblclick();`);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function handleSubmit(event: ParsedEvent): Promise<string> {
  return new Promise((resolve, reject) => {
    getPatternMethod()
      .then((method) => {
        resolve(`cy.${method}('${event.selector}').submit();`);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function handleUrl(url: string): string {
  const { origin, pathname } = new URL(url);
  return `cy.url().should('contains', '${origin + pathname}');`;
}

export default {
  createBlock: (event: ParsedEvent): Promise<string> => {
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
  },
  createVisit: (url: string): string => `cy.visit('${url}');`,
  createUrl: (url: string): string => handleUrl(url),
};
