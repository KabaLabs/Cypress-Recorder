import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import ActiveRecordingBox from './ActiveRecordingBox';
import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';
import { RecAction, BlockData } from '../../types/types';
import '../../assets/styles/styles.scss';

export type RecState =
  | 'off'
  | 'on'
  | 'done';

export default () => {
  const [recStatus, setRecStatus] = React.useState<RecState>('off');
  const [codeBlocks, setCodeBlocks] = React.useState<BlockData>([]);

  const handleToggle = (action: RecAction) => {
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
      chrome.runtime.sendMessage(action);
    }
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

  React.useEffect(() => {
    chrome.storage.local.get(['status', 'codeBlocks'], (result) => {
      if (!result.status) chrome.storage.local.set({ status: recStatus });
      else if (result.status === 'on') setRecStatus('on');
      else if (result.status === 'done') setRecStatus('done');
      if (result.codeBlocks) setCodeBlocks(result.codeBlocks);
    });
  }, []);

  React.useEffect(() => {
    chrome.storage.local.set({ status: recStatus });
  }, [recStatus]);

  return (
    <div id="App">
      <Header />
      {recStatus === 'off' && <LandingBox />}
      {recStatus === 'on' && <ActiveRecordingBox />}
      {recStatus === 'done' && <CodeDisplay codeBlocks={codeBlocks}/>}
      <Footer recStatus={recStatus} handleToggle={handleToggle} copyToClipboard={copyToClipboard}/>
    </div>
  );
};
