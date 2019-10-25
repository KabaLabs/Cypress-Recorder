export type RecState =
  | 'off'
  | 'on'
  | 'paused';

export interface ParsedEvent {
  selector: string,
  action: string,
  tag: string,
  value: string,
  id?: string,
  key?: string,
  href?: string,
  inputType?: string,
}

export interface BackgroundStatus {
  isPending: boolean,
  recStatus: RecState,
}

export interface ActionWithPayload {
  type: string,
  payload: any,
}
