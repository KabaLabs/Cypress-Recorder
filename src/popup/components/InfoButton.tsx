import * as React from 'react';

export interface InfoButtonProps { }

export const InfoButton: React.FC = (props: InfoButtonProps) => {
  const handleClick = (): void => {
    
  };

  return (
    <>
      <button onClick={handleClick}>Info</button>
    </>
  );
};
