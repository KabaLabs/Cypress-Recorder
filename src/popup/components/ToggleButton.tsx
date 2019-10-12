import * as React from 'react';
import { RecDispatch } from './App';

export interface ToggleButtonProps {
  recStatus: String,
};

export const ToggleButton = ({ recStatus }: ToggleButtonProps) => {
  const dispatch = React.useContext(RecDispatch);

  const handleClick = (): void => {
    let type: String;
    chrome.runtime.sendMessage({ type: 'startRec' });
    if (recStatus === 'off') type = 'startRec';
    else if (recStatus === 'on') type = 'resetRec';
    dispatch({ type });
  };

  return (
    <>
      <button onClick={handleClick}>
        {recStatus === 'off'
          ? 'Start Recording'
          : 'Stop Recording'}
      </button>
    </>
  );
}
