import * as React from 'react';
import { BlockData } from '../../types';
import CypressCone from './CypressCone';

export interface CodeDisplayProps {
  codeBlocks: BlockData,
};

export default ({ codeBlocks }: CodeDisplayProps) => {
  const blocks = codeBlocks.map((block) => (
    <p>{block}</p>
  ));

  return (
    <div id="code-display">
      {blocks}
    </div>
  )
};
