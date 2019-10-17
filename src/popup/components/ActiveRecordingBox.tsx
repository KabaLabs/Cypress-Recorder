import * as React from 'react';
import CypressCone from './CypressCone';

export interface ActiveRecordingBoxProps {

};

export default (props: ActiveRecordingBoxProps) => (
  <div id="active-box">
    <CypressCone />
    <p className="text">Click 'Stop Recording' to see the results of your session!</p>
  </div>
);
