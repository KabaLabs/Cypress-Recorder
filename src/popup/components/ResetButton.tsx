import * as React from 'react';
import { ControlAction } from '../../constants';

export interface ResetButtonProps {
  handleToggle: (action: ControlAction) => void,
}

export default ({ handleToggle }: ResetButtonProps) => (
  <div id="reset-wrap">
    <button
      type="button"
      id="reset"
      className="button"
      onClick={() => handleToggle(ControlAction.RESET)}
    >
      Reset
    </button>
  </div>
);
