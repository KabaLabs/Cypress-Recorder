import * as React from 'react';

export interface ClipboardButtonProps {
  copyToClipboard: Function,
}

export const ClipboardButton = ({ copyToClipboard }: ClipboardButtonProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleClick = (): void => {
    const res = copyToClipboard();
    setSuccess(res);
  };

  return (
    <>
      <button onClick={handleClick}>Copy to Clipboard</button>
      {success && <p>Copied!</p>}
    </>
  );
}
