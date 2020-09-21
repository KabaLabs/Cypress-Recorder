import * as React from 'react';
import ToggleButton from './ToggleButton';
import ResetButton from './ResetButton';
import ClipboardButton from './ClipboardButton';
import { ControlAction, RecState } from '../../constants';

export interface FooterProps {
  isValidTab: boolean,
  recStatus: RecState,
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
    {recStatus === RecState.PAUSED && <ResetButton handleToggle={handleToggle} />}
    {recStatus === RecState.PAUSED && <ClipboardButton copyToClipboard={copyToClipboard} />}
  </div>
);
