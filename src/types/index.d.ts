export type CodeBlock = string;

export type BlockData = CodeBlock[];

export type RecState =
  | 'off'
  | 'on'
  | 'done';

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

export interface RecordedSession {
  host: string | null,
  processedCode: BlockData,
}

export interface BackgroundStatus {
  isPending: boolean,
  recStatus: RecState,
}
