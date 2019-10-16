import * as React from 'react';
import { CodeBlock } from '../../types';

export interface CodeBlockProps {
  block: CodeBlock
};

export default ({ block }: CodeBlockProps) => (
  <div>
    <p>{block}</p>
  </div>
);
