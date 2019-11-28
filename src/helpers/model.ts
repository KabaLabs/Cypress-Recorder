import { generate } from 'shortid';
import { RecState, Block, ParsedEvent } from '../types';
import { EventType } from '../constants';
import codeGenerator from './codeGenerator';

export default class Model {
  status: RecState;

  private generator: Generator<string, null, ParsedEvent>;

  private processedCode: Block[];

  constructor() {
    this.sync();
  }

  /**
   * Checks the data currently stored in Chrome local storage and performs logic based on current
   * recording status.
   */
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

  /**
   * Resets application to original state.
   */
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

  /**
   * Adds a codeblock to the array of code blocks and updates Chrome local storage.
   * @param block
   */
  private pushBlock(block: string): Promise<Block> {
    return new Promise((resolve, reject) => {
      if (!block) return resolve(null);
      const newBlock: Block = {
        value: block,
        id: generate(),
      };
      this.processedCode.push(newBlock);
      chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve(newBlock);
      });
    });
  }

  /**
   * Deletes a code block from the code display and updates Chrome local storage.
   * @param index
   */
  deleteBlock(index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processedCode.splice(index, 1);
      chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }

  /**
   * Allows the user to drag and drop code blocks to new positions in the array.
   * @param i
   * @param j
   */
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

  /**
   * Updates the recording status and sends to the background.
   * @param newStatus
   */
  updateStatus(newStatus: RecState): Promise<void> {
    return new Promise((resolve, reject) => {
      this.status = newStatus;
      chrome.storage.local.set({ status: this.status }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }

  resume(url: string): Promise<Block> {
    return new Promise((resolve, reject) => {
      this.generator = codeGenerator(url);
      this.pushBlock(this.generator.next().value as string)
        .then(resolve)
        .catch(reject);
    });
  }

  parseBlock(event: ParsedEvent): Promise<Block> {
    return new Promise((resolve, reject) => {
      const block: string = this.generator.next(event).value;
      if (!block) return resolve(null);
      if (event.action === EventType.DBLCLICK) this.processedCode.splice(-2, 2);
      else if (
        this.processedCode[this.processedCode.length - 1].value.endsWith('.click();')
        && ((event.action === EventType.SUBMIT && event.tag === 'FORM')
          || event.action === EventType.CHANGE
        )
      ) this.processedCode.pop();
      this.pushBlock(block)
        .then(resolve)
        .catch(reject);
    });
  }
}
