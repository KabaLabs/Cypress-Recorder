import * as React from 'react';
import CodeBlock from './CodeBlock';
import { BlockData } from '../../types';

export interface CodeDisplayProps {
  codeBlocks: BlockData,
};

export default ({ codeBlocks }: CodeDisplayProps) => {
  const blocks = codeBlocks.map((block) => (
    <CodeBlock block={block} />
  ));

  return (
    <div>
      {blocks.length ? blocks : 'awaiting session results'}
    </div>
  )
};
