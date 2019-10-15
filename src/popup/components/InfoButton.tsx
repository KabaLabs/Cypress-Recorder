import * as React from 'react';

export interface InfoButtonProps {
  toggleInfoDisplay: () => void,
}

export default ({ toggleInfoDisplay }: InfoButtonProps) => {


  const handleClick = (): void => {
    toggleInfoDisplay();
  };

  return (
    <>
      <button onClick={handleClick}>Info</button>
    </>
  );
};
