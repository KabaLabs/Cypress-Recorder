import * as React from 'react';

export interface ClipboardButtonProps { }

export const ClipboardButton: React.FC = (props: ClipboardButtonProps) => {
  const handleClick = (): void => {

  };

  return (
    <>
      <button onClick={() => navigator.clipboard.writeText()}>Copy to Clipboard</button>
    </>
  );
}
