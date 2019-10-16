import * as React from 'react';
import { ControlAction } from '../../constants';

export interface ToggleButtonProps {
  recStatus: String,
  handleToggle: (action: ControlAction) => void,
};

export default ({ recStatus, handleToggle }: ToggleButtonProps) => {
  const handleClick = (): void => {
    let action: ControlAction;
    if (recStatus === 'off') action = ControlAction.START;
    else if (recStatus === 'on') action = ControlAction.STOP;
    else if (recStatus === 'done') action = ControlAction.RESET;
    handleToggle(action);
  };

  return (
    <>
      <button onClick={handleClick}>
        {recStatus === 'off'
          ? 'Start Recording'
          : recStatus === 'on'
            ? 'Stop Recording'
            : 'Reset Recording'}
      </button>
    </>
  );
}
