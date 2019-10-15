import * as React from 'react';
import InfoButton from './InfoButton';

export interface HeaderProps { }

export default (props: HeaderProps) => (
  <div>
    Header
    <InfoButton />
  </div>
);
