import * as React from 'react';
import ToggleButton from './ToggleButton';
import ClipboardButton from './ClipboardButton';
import { ControlAction } from '../../constants';

export interface FooterProps {
  recStatus: string,
  handleToggle: (action: ControlAction) => void,
  copyToClipboard: () => Promise<void>,
}

export default ({ recStatus, handleToggle, copyToClipboard }: FooterProps) => (
  <div id="footer">
    <ToggleButton recStatus={recStatus} handleToggle={handleToggle} />
    {recStatus === 'done' && <ClipboardButton copyToClipboard={copyToClipboard} />}
  </div>
);
