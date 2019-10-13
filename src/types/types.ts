export type RecordedEvent = {
  type: String,
  frameId: Number,
}

export type EventData = RecordedEvent[];

export type RecordedBlock = String;

export type BlockData = RecordedBlock[];

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
  keyCode?: Number,
};

export type RecordedSession = {
  sender?: chrome.runtime.MessageSender,
  events: ParsedEvent[],
};
