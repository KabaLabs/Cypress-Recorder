import * as React from 'react';
import type { Block } from '../../types';
import { RecState } from '../../constants';
import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';

export interface BodyProps {
  isValidTab: boolean,
  recStatus: RecState,
  codeBlocks: Block[],
  destroyBlock: (index: number) => void,
  moveBlock: (dragIdx: number, dropIdx: number) => void,
}

export default ({
  recStatus,
  codeBlocks,
  isValidTab,
  destroyBlock,
  moveBlock,
}: BodyProps) => (
  <div id="body">
    {recStatus === RecState.OFF && <LandingBox isValidTab={isValidTab} />}
    {recStatus !== RecState.OFF && <CodeDisplay codeBlocks={codeBlocks} destroyBlock={destroyBlock} moveBlock={moveBlock} />}
  </div>
);
