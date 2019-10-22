import * as React from 'react';
import { RecState } from '../../types';

import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';

export interface BodyProps {
  isValidTab: boolean,
  recStatus: RecState,
  codeBlocks: string[],
}

export default ({ recStatus, codeBlocks, isValidTab }: BodyProps) => (
  <div id="body">
    {recStatus === 'off' && <LandingBox isValidTab={isValidTab} />}
    {recStatus !== 'off' && <CodeDisplay codeBlocks={codeBlocks} />}
  </div>
);
