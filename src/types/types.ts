export type RecordedEvent = {
  type: String,
  frameId: Number,
}

export type EventData = RecordedEvent[];

export type CodeBlock = String;

export type BlockData = CodeBlock[];

export type EventAction = {
  type: String,
  payload?: RecordedEvent,
}

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
  keyCode?: any,
};

export type RecordedSession = {
  sender?: chrome.runtime.MessageSender,
  events: ParsedEvent[],
};
