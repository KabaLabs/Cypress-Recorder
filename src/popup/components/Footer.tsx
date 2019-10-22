import * as React from 'react';
import ToggleButton from './ToggleButton';
import ResetButton from './ResetButton';
import ClipboardButton from './ClipboardButton';
import { ControlAction } from '../../constants';

export interface FooterProps {
  isValidTab: boolean,
  recStatus: string,
  handleToggle: (action: ControlAction) => void,
  copyToClipboard: () => Promise<void>,
}

export default ({
  isValidTab,
  recStatus,
  handleToggle,
  copyToClipboard,
} : FooterProps) => (
  <div id="footer">
    <ToggleButton recStatus={recStatus} handleToggle={handleToggle} isValidTab={isValidTab} />
    {recStatus === 'paused' && <ResetButton handleToggle={handleToggle} />}
    {recStatus === 'paused' && <ClipboardButton copyToClipboard={copyToClipboard} />}
  </div>
);
