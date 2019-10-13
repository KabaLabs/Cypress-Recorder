import * as React from 'react';
import { ParsedEvent } from '../../types/types';

export interface CodeBlockProps {
  block: ParsedEvent
};

export default ({ block }: CodeBlockProps) => (
  <div>
    <p>Selector: {block.selector}</p>
    <p>Action: {block.action}</p>
  </div>
);
