import * as React from 'react';
import ToggleButton from './ToggleButton';
import ClipboardButton from './ClipboardButton';
import { RecAction } from '../../types';

export interface FooterProps {
  recStatus: string,
  handleToggle: (action: RecAction) => void,
  copyToClipboard: () => Promise<boolean>,
};

export default ({ recStatus, handleToggle, copyToClipboard }: FooterProps) => (
  <div id="footer">
    Footer
    {recStatus === 'done' && <ClipboardButton copyToClipboard={copyToClipboard}/>}
    <ToggleButton recStatus={recStatus} handleToggle={handleToggle}/>
  </div>
);
