import * as React from 'react';
import ToggleButton from './ToggleButton';
import ClipboardButton from './ClipboardButton';

export interface FooterProps {
  recStatus: String,
  handleToggle: Function,
  copyToClipboard: Function,
};

export default ({ recStatus, handleToggle, copyToClipboard }: FooterProps) => (
  <div>
    Footer
    {recStatus === 'done' && <ClipboardButton copyToClipboard={copyToClipboard}/>}
    <ToggleButton recStatus={recStatus} handleToggle={handleToggle}/>
  </div>
);
