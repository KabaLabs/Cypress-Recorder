import * as React from 'react';
import { ControlAction } from '../../constants';

export interface ToggleButtonProps {
  isValidTab: boolean,
  recStatus: string,
  handleToggle: (action: ControlAction) => void,
}

export default ({ recStatus, handleToggle, isValidTab }: ToggleButtonProps) => {
  const handleClick = (): void => {
    let action: ControlAction;
    if (recStatus === 'off') action = ControlAction.START;
    else if (recStatus === 'on') action = ControlAction.STOP;
    else if (recStatus === 'done') action = ControlAction.RESET;
    handleToggle(action);
  };

  return (
    <>
      <button type="button" className="button" onClick={handleClick} disabled={!isValidTab}>
        {!isValidTab && 'Invalid Tab'}
        {recStatus === 'off' && isValidTab && 'Start Recording'}
        {recStatus === 'on' && isValidTab && 'Stop Recording'}
        {recStatus === 'done' && isValidTab && 'Reset Recording'}
      </button>
    </>
  );
}
