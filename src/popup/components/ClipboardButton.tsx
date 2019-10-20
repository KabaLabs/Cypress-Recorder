import * as React from 'react';

export interface ClipboardButtonProps {
  copyToClipboard: () => Promise<void>,
}

export default ({ copyToClipboard }: ClipboardButtonProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleClick = async (): Promise<void> => {
    await copyToClipboard();
    setSuccess(true);
  };

  return (
    <>
      <button type="button" className="button" onClick={handleClick}>Copy to Clipboard</button>
      {success && <p className="white-text">Copied!</p>}
    </>
  );
};
