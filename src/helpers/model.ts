import { RecState } from '../types';

export default class Model {
  status: RecState;

  processedCode: string[];

  constructor() {
    this.sync();
  }

  sync(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['status', 'codeBlocks'], result => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else {
          if (result.status === 'on' || result.status === 'paused') {
            this.status = 'paused';
            this.processedCode = result.codeBlocks || [];
          } else {
            this.status = 'off';
            this.processedCode = [];
          }
          chrome.storage.local.set({ status: this.status, codeBlocks: this.processedCode }, () => {
            if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
            else resolve();
          });
        }
      });
    });
  }

  reset(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.status = 'off';
      this.processedCode = [];
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

  moveBlock(i: number, j: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const dragged = this.processedCode.splice(i, 1)[0];
      this.processedCode.splice(j, 0, dragged);
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
