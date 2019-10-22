import * as React from 'react';
import ToggleButton from './ToggleButton';
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
    {recStatus === 'done' && <ClipboardButton copyToClipboard={copyToClipboard} />}
  </div>
);

// adjust footer component to have additional props
// if isValidTab is false, render disabled button using HTML disabled property
