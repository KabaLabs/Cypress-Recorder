import { RecState } from '../types';

export default class Model {
  status: RecState;

  processedCode: string[];

  constructor() {
    this.sync('off', []);
  }

  sync(newStatus?: RecState, newCode?: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (newStatus) this.status = newStatus;
      if (newCode) this.processedCode = newCode;
      chrome.storage.local.set({ status: this.status, codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }

  pushBlock(block: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processedCode.push(block);
      chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }

  deleteBlock(index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processedCode.splice(index, 1);
      chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }

  swapBlocks(i: number, j: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const temp = this.processedCode[i];
      this.processedCode[i] = this.processedCode[j];
      this.processedCode[j] = temp;
      chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }

  updateStatus(newStatus: RecState): Promise<void> {
    return new Promise((resolve, reject) => {
      this.status = newStatus;
      chrome.storage.local.set({ status: this.status }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }
}
