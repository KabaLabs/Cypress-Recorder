import * as React from 'react';
import Header from './Header';
import Info from './Info';
import Footer from './Footer';
import Body from './Body';
import { RecAction, BlockData } from '../../types';
import '../../assets/styles/styles.scss';

export type RecState =
  | 'off'
  | 'on'
  | 'done';

export default () => {
  const [recStatus, setRecStatus] = React.useState<RecState>('off');
  const [codeBlocks, setCodeBlocks] = React.useState<BlockData>([]);
  const [shouldInfoDisplay, setShouldInfoDisplay] = React.useState<boolean>(true);

  const handleToggle = (action: RecAction): void => {
    if (action.type === 'startRec') {
      setRecStatus('on');
      chrome.runtime.sendMessage(action);
    } else if (action.type === 'stopRec') {
      setRecStatus('done');
      chrome.runtime.sendMessage(action, (response: BlockData) => {
        if (!response.length) setRecStatus('off');
        else setCodeBlocks(response);
      });
    } else if (action.type === 'resetRec') {
      setRecStatus('off');
    }
      chrome.runtime.sendMessage(action);
  };

  const toggleInfoDisplay = (): void => {
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
    else setShouldInfoDisplay(true);
  };

  const copyToClipboard = async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(codeBlocks.join('\n'));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  React.useEffect((): void => {
    chrome.storage.local.get(['status', 'codeBlocks'], (result) => {
      if (!result.status) chrome.storage.local.set({ status: recStatus });
      else if (result.status === 'on') setRecStatus('on');
      else if (result.status === 'done') setRecStatus('done');
      if (result.codeBlocks) setCodeBlocks(result.codeBlocks);
    });
  }, []);

  React.useEffect((): void => {
    chrome.storage.local.set({ status: recStatus });
  }, [recStatus]);

  return (
    <div id="App">
      <Header shouldInfoDisplay={shouldInfoDisplay} toggleInfoDisplay={toggleInfoDisplay} />
      {
        (shouldInfoDisplay
          ? <Body codeBlocks={codeBlocks} recStatus={recStatus} />
          : <Info />
          )
      }
      <Footer recStatus={recStatus} handleToggle={handleToggle} copyToClipboard={copyToClipboard} />
    </div>
  );
};
