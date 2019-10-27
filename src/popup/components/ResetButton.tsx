import * as React from 'react';
import { ControlAction } from '../../constants';

export interface ResetButtonProps {
  handleToggle: (action: ControlAction) => void,
}

export default ({ handleToggle }: ResetButtonProps) => (
  <>
    <button
      type="button"
      className="button"
      onClick={() => handleToggle(ControlAction.RESET)}
    >
      Reset
    </button>
  </>
);
