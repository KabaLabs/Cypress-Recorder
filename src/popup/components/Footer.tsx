import * as React from 'react';
import { ToggleButton } from './ToggleButton';

export interface FooterProps {
  recStatus: String,
  handleToggle: Function,
};

export const Footer = ({ recStatus, handleToggle }: FooterProps) => (
  <div>
    Footer
    <ToggleButton recStatus={recStatus} handleToggle={handleToggle}/>
  </div>
);
