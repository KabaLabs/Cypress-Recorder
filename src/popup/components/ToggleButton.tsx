import * as React from 'react';
import { RecAction } from '../../types/types';

export interface ToggleButtonProps {
  recStatus: String,
  handleToggle: Function,
};

export const ToggleButton = ({ recStatus, handleToggle }: ToggleButtonProps) => {
  const handleClick = (): void => {
    let action: RecAction;
    if (recStatus === 'off') action = { type: 'startRec' };
    else if (recStatus === 'on') action = { type: 'stopRec' };
    else if (recStatus === 'done') action = { type: 'resetRec' };
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
