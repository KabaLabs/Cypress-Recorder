/**
 * Generates the Cypress code that will simulate the recorded user session.
 *
 * Each time the user records, this function will generate a cy.visit command that will
 * store the current url, as well each subsequest user interaction with the browser.
 */
import type { ParsedEvent } from '../types';
import { EventType } from '../constants';

/**
 * Helper functions that handle each action type.
 * @param event
 */
 async function getPatternMethod(): Promise<string> {
  const defaultConfig = { pattern: 'css selectors' }; // 默认配置
  return new Promise((resolve) => {
    chrome.storage.local.get(defaultConfig, (items) => {
      let method = 'get';
      if (items.pattern === 'xpath') {
        method = 'xpath';
      }
      resolve(method);
    });
  });
}

async function handleClick(event: ParsedEvent): Promise<string> {
  const method = await getPatternMethod();
  return `cy.${method}('${event.selector}').click();`;
}

async function handleKeydown(event: ParsedEvent): Promise<string | null> {
  const method = await getPatternMethod();
  switch (event.key) {
    case 'Backspace':
      return `cy.${method}('${event.selector}').type('{backspace}');`;
    case 'Escape':
      return `cy.${method}('${event.selector}').type('{esc}');`;
    case 'ArrowUp':
      return `cy.${method}('${event.selector}').type('{uparrow}');`;
    case 'ArrowRight':
      return `cy.${method}('${event.selector}').type('{rightarrow}');`;
    case 'ArrowDown':
      return `cy.${method}('${event.selector}').type('{downarrow}');`;
    case 'ArrowLeft':
      return `cy.${method}('${event.selector}').type('{leftarrow}');`;
    default:
      return null;
  }
}

async function handleChange(event: ParsedEvent): Promise<string> {
  const method = await getPatternMethod();
  if (event.inputType === 'checkbox' || event.inputType === 'radio') return null;
  return `cy.${method}('${event.selector}').type('${event.value.replace(/'/g, "\\'")}');`;
}

async function handleDoubleclick(event: ParsedEvent): Promise<string> {
  const method = await getPatternMethod();
  return `cy.${method}('${event.selector}').dblclick();`;
}

async function handleSubmit(event: ParsedEvent): Promise<string> {
  const method = await getPatternMethod();
  return `cy.${method}('${event.selector}').submit();`;
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
