import * as React from 'react';
import CypressCone from './CypressCone';

export interface LandingBoxProps { }

export default (props: LandingBoxProps) => (
  <div id="landing-box">
    <CypressCone />
    <p className="text">Click 'Start Recording' to start recording!</p>
  </div>
);
