import * as React from 'react';
import InfoButton from './InfoButton';

export interface HeaderProps {
  toggleInfoDisplay: () => void,
  shouldInfoDisplay: boolean,
}

export default ({ shouldInfoDisplay, toggleInfoDisplay }: HeaderProps) => (
  <div id="header">
    <h1 id="title">Cypress Recorder</h1>
    <InfoButton shouldInfoDisplay={shouldInfoDisplay} toggleInfoDisplay={toggleInfoDisplay} />
  </div>
);
