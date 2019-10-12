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

export type controlAction = {
  type: String,
};
