import * as React from 'react';
import { BlockData } from '../../types';

import ActiveRecordingBox from './ActiveRecordingBox';
import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';

export interface BodyProps {
  recStatus: string,
  codeBlocks: BlockData,
}

export default ({ recStatus, codeBlocks }: BodyProps) => {
  return (
    <div>
      {recStatus === 'off' && <LandingBox />}
      {recStatus === 'on' && <ActiveRecordingBox />}
      {recStatus === 'done' && <CodeDisplay codeBlocks={codeBlocks} />}
    </div>
  );
};