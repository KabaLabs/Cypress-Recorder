import * as React from 'react';
import Header from './Header';
import Info from './Info';
import Footer from './Footer';
import Body from './Body';
import { RecState, BlockData, CodeBlock } from '../../types';
import { ControlAction } from '../../constants';
import '../../assets/styles/styles.scss';

export default () => {
  const [recStatus, setRecStatus] = React.useState<RecState>('off');
  const [codeBlocks, setCodeBlocks] = React.useState<BlockData>([]);
  const [shouldInfoDisplay, setShouldInfoDisplay] = React.useState<boolean>(false);
  const [lastBlock, setLastBlock] = React.useState<string>('');

  const startRecording = () => {
    chrome.runtime.sendMessage(ControlAction.START);
    setRecStatus('on');
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
  };

  const stopRecording = () => {
    chrome.runtime.sendMessage(ControlAction.STOP);
    setRecStatus('done');
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
  };

  const resetRecording = () => {
    chrome.runtime.sendMessage(ControlAction.RESET);
    setRecStatus('off');
    setCodeBlocks([]);
    setLastBlock('');
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
  };

  const handleToggle = (action: ControlAction): void => {
    switch (action) {
      case ControlAction.START:
        startRecording();
        break;
      case ControlAction.STOP:
        stopRecording();
        break;
      case ControlAction.RESET:
        resetRecording();
        break;
      default:
        throw new Error(`Unhandled action: ${action}`);
    }
  };

  const toggleInfoDisplay = (): void => {
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
    else setShouldInfoDisplay(true);
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(codeBlocks.join('\n'));
    } catch (error) {
      throw new Error(error);
    }
  };

  const pushBlock = (block: CodeBlock): void => {
    setLastBlock(block);
  };

  React.useEffect((): void => {
    chrome.storage.local.get(['status', 'codeBlocks'], result => {
      if (result.codeBlocks) setCodeBlocks(result.codeBlocks);
      if (result.status === 'on') setRecStatus('on');
      else if (result.status === 'done') setRecStatus('done');
    });
    chrome.runtime.onMessage.addListener(pushBlock);
  }, []);

  React.useEffect((): void => {
    setCodeBlocks([...codeBlocks, lastBlock]);
  }, [lastBlock]);

  return (
    <div id="App">
      <Header shouldInfoDisplay={shouldInfoDisplay} toggleInfoDisplay={toggleInfoDisplay} />
      {
        (shouldInfoDisplay
          ? <Info />
          : <Body codeBlocks={codeBlocks} recStatus={recStatus} />
        )
      }
      <Footer recStatus={recStatus} handleToggle={handleToggle} copyToClipboard={copyToClipboard} />
    </div>
  );
};
