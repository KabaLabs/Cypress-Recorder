import * as React from 'react';
import InfoButton from './InfoButton';

export interface HeaderProps {
  toggleInfoDisplay: () => void,
}

export default ({ toggleInfoDisplay }: HeaderProps) => (
  <div>
    Header
    <InfoButton toggleInfoDisplay={toggleInfoDisplay} />
  </div>
);
