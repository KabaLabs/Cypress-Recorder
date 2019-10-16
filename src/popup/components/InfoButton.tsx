import * as React from 'react';

export interface InfoButtonProps {
  toggleInfoDisplay: () => void,
  shouldInfoDisplay: boolean,
}

export default ({ shouldInfoDisplay, toggleInfoDisplay }: InfoButtonProps) => {


  const handleClick = (): void => {
    toggleInfoDisplay();
  };

  return (
    <>
      <button onClick={handleClick}>
      {shouldInfoDisplay ? 'Info' : 'Recording Menu'} 
      </button>
    </>
  );
};
