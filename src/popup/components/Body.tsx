import * as React from 'react';
import { BlockData, RecState } from '../../types';

import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';

export interface BodyProps {
  isValidTab: boolean,
  recStatus: RecState,
  codeBlocks: BlockData,
}

export default ({ recStatus, codeBlocks, isValidTab }: BodyProps) => (
  <div id="body">
    {recStatus === 'off' && <LandingBox isValidTab={isValidTab} />}
    {recStatus !== 'off' && <CodeDisplay codeBlocks={codeBlocks} />}
  </div>
);
