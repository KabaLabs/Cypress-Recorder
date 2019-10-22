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
    if (recStatus === 'off' || recStatus === 'paused') action = ControlAction.START;
    else if (recStatus === 'on') action = ControlAction.STOP;
    handleToggle(action);
  };

  const buttonClass: string = (!isValidTab && recStatus === 'off') ? 'disabled-button' : 'button';

  return (
    <>
      <button type="button" className={buttonClass} onClick={handleClick} disabled={!isValidTab && (recStatus === 'off' || recStatus === 'paused')}>
        {(recStatus === 'off' || recStatus === 'paused') && !isValidTab && 'Invalid Tab'}
        {recStatus === 'off' && isValidTab && 'Start Recording'}
        {recStatus === 'paused' && isValidTab && 'Resume Recording'}
        {recStatus === 'on' && 'Stop Recording'}
      </button>
    </>
  );
};
