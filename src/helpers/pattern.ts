import { MatchPattern } from '../constants';

export function getPattern(): Promise<string> {
  const defaultConfig = { pattern: MatchPattern.CSS };
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(defaultConfig, (items) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve(items.pattern);
    });
  });
}

export function getPatternMethod(): Promise<string> {
  return new Promise((resolve, reject) => {
    let method = 'get';
    getPattern()
      .then((pattern) => {
        if (pattern === MatchPattern.XPATH) method = 'xpath';
        resolve(method);
      })
      .catch(err => {
        reject(err);
      });
  })
}
