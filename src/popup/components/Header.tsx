import * as React from 'react';
import { InfoButton } from './InfoButton';

export interface HeaderProps { }

export const Header: React.FC = (props: HeaderProps) => (
  <div>
    Header
    <InfoButton />
  </div>
);
