export enum EventType {
  CLICK = 'click',
  CHANGE = 'change',
  DBLCLICK = 'dblclick',
  KEYDOWN = 'keydown',
  SUBMIT = 'submit',
}

export enum ControlAction {
  START,
  STOP,
  RESET,
  DELETE,
  MOVE,
  PUSH,
}

export enum RecState {
  ON,
  OFF,
  PAUSED,
}

export enum MatchPattern {
  CSS = 'css selectors',
  XPATH = 'xpath'
}
