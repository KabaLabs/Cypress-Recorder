import * as React from 'react';
import { ParsedEvent, CodeBlock } from '../../types/types';

export interface CodeBlockProps {
  block: CodeBlock
};

export default ({ block }: CodeBlockProps) => (
  <div>
    <p>{block}</p>
  </div>
);
