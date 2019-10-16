import * as React from 'react';
import ToggleButton from './ToggleButton';
import ClipboardButton from './ClipboardButton';
import { ControlAction } from '../../constants';

export interface FooterProps {
  recStatus: string,
  handleToggle: (action: ControlAction) => void,
  copyToClipboard: () => Promise<boolean>,
};

export default ({ recStatus, handleToggle, copyToClipboard }: FooterProps) => (
  <div>
    Footer
    {recStatus === 'done' && <ClipboardButton copyToClipboard={copyToClipboard}/>}
    <ToggleButton recStatus={recStatus} handleToggle={handleToggle}/>
  </div>
);
