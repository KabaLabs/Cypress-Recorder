import * as React from 'react';
import { ToggleButton } from './ToggleButton';

export interface FooterProps {
  recStatus: String,
};

export const Footer = ({ recStatus }: FooterProps) => (
  <div>
    Footer
    <ToggleButton recStatus={recStatus}/>
  </div>
);
