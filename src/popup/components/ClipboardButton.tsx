import * as React from 'react';

export interface ClipboardButtonProps {
  copyToClipboard: () => Promise<boolean>,
}

export default ({ copyToClipboard }: ClipboardButtonProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleClick = async (): Promise<void> => {
    const res = await copyToClipboard();
    setSuccess(res);
  };

  return (
    <>
      <button onClick={handleClick}>Copy to Clipboard</button>
      {success && <p>Copied!</p>}
    </>
  );
}
