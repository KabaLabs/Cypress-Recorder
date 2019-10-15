export type CodeBlock = string;

export type BlockData = CodeBlock[];

export type RecAction =
  | { type: 'startRec' }
  | { type: 'stopRec' }
  | { type: 'resetRec' };

export type ParsedEvent = {
  selector: string,
  action: string,
  tag: string,
  value: string,
  id?: string,
  key?: string,
  href?: string,
};

export type RecordedSession = {
  sender?: chrome.runtime.MessageSender,
  events: ParsedEvent[],
};
