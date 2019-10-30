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

  const buttonClass: string = (!isValidTab && (recStatus === 'off' || recStatus === 'paused')) ? 'disabled-button' : 'button';

  return (
    <div id="toggle-wrap">
      <button type="button" id="toggle" className={buttonClass} onClick={handleClick} disabled={!isValidTab && (recStatus === 'off' || recStatus === 'paused')}>
        {(recStatus === 'off' || recStatus === 'paused') && !isValidTab && 'Invalid Tab'}
        {recStatus === 'off' && isValidTab && 'Start Recording'}
        {recStatus === 'paused' && isValidTab && 'Resume'}
        {recStatus === 'on' && 'Stop Recording'}
      </button>
    </div>
  );
};
