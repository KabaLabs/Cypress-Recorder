import * as React from 'react';

export interface ClipboardButtonProps {
  copyToClipboard: () => Promise<void>,
}

export default ({ copyToClipboard }: ClipboardButtonProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleClick = async (): Promise<void> => {
    try {
      await copyToClipboard();
      setSuccess(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div id="copy-wrap">
      <button type="button" id="copy" className="button" onClick={handleClick}>
        {success ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};
