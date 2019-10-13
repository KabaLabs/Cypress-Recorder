import * as React from 'react';
import { RecAction } from './App';

export interface ToggleButtonProps {
  recStatus: String,
  handleToggle: Function,
};

export const ToggleButton = ({ recStatus, handleToggle }: ToggleButtonProps) => {
  const handleClick = (): void => {
    let action: RecAction;
    if (recStatus === 'off') action = 'startRec';
    else if (recStatus === 'on') action = 'stopRec';
    else if (recStatus === 'done') action = 'resetRec';
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
