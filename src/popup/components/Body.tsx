import * as React from 'react';
import { BlockData, RecState } from '../../types';

import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';

export interface BodyProps {
  recStatus: RecState,
  codeBlocks: BlockData,
}

export default ({ recStatus, codeBlocks }: BodyProps) => {
  return (
    <div id="body">
      {recStatus === 'off' && <LandingBox />}
      {recStatus !== 'off' && <CodeDisplay codeBlocks={codeBlocks} />}
    </div>
  );
};
