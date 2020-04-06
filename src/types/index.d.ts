import { ControlAction } from '../constants';

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

export interface Session {
  isPending: boolean,
  lastURL: string,
  originalHost: string,
  activePort: chrome.runtime.Port | null,
}

export interface ActionWithPayload {
  type: ControlAction,
  payload?: any,
}

export interface Block {
  value: string,
  id: string,
}
