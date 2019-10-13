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

export type controlActionTypes =
  | { type: 'startRec' }
  | { type: 'stopRec' }
  | { type: 'resetRec' };
