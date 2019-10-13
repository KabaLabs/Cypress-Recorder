import * as React from 'react';
import CodeBlock from './CodeBlock';
import { RecordedSession } from '../../types/types';

export interface CodeDisplayProps {
  session: RecordedSession,
};

export const CodeDisplay = ({ session }: CodeDisplayProps) => {
  const blocks = session.events.map((parsedEvent) => (
    <CodeBlock block={parsedEvent} />
  ));

  return (
    <div>
      {blocks.length ? blocks : 'awaiting session results'}
    </div>
  )
};
