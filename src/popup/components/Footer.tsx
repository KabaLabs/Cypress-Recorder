import * as React from 'react';
import { ToggleButton } from './ToggleButton';
import { ClipboardButton } from './ClipboardButton';

export interface FooterProps {
  recStatus: String,
  handleToggle: Function,
};

export const Footer = ({ recStatus, handleToggle }: FooterProps) => (
  <div>
    Footer
    {recStatus === 'done' && <ClipboardButton />}
    <ToggleButton recStatus={recStatus} handleToggle={handleToggle}/>
  </div>
);
