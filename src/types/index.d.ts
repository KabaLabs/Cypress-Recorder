export type CodeBlock = string;

export type BlockData = CodeBlock[];

export type RecAction =
  | { type: 'startRec' }
  | { type: 'stopRec' }
  | { type: 'resetRec' };

export interface ParsedEvent {
  selector: string,
  action: EventType,
  tag: string,
  value: string,
  id?: string,
  key?: string,
  href?: string,
}

export interface RecordedSession {
  sender?: chrome.runtime.MessageSender,
  events: ParsedEvent[],
}

export enum EventType {
  CLICK = 'click',
  CHANGE = 'change',
  DBCLICK = 'dbclick',
  KEYDOWN = 'keydown',
  RESET = 'reset',
  SUBMIT = 'submit',
}
