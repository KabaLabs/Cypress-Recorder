export type CodeBlock = String;

export type BlockData = CodeBlock[];

export type RecAction =
  | { type: 'startRec' }
  | { type: 'stopRec' }
  | { type: 'resetRec' };

export type ParsedEvent = {
  selector: String,
  action: String,
  tag: String,
  value: String,
  id?: String,
  keyCode?: Number,
};

export type RecordedSession = {
  sender?: chrome.runtime.MessageSender,
  events: ParsedEvent[],
};
