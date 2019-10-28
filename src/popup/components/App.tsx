import * as React from 'react';
import Header from './Header';
import Info from './Info';
import Footer from './Footer';
import Body from './Body';
import { RecState } from '../../types';
import { ControlAction } from '../../constants';
import '../../assets/styles/styles.scss';

export default () => {
  const [recStatus, setRecStatus] = React.useState<RecState>('off');
  const [codeBlocks, setCodeBlocks] = React.useState<string[]>([]);
  const [shouldInfoDisplay, setShouldInfoDisplay] = React.useState<boolean>(false);
  const [isValidTab, setIsValidTab] = React.useState<boolean>(true);
  const [lastBlock, setLastBlock] = React.useState<string>('');

  React.useEffect((): void => {
    if (lastBlock) setCodeBlocks([...codeBlocks, lastBlock]);
  }, [lastBlock]);

  React.useEffect((): void => {
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
    if (recStatus === 'off') {
      setCodeBlocks([]);
      setLastBlock('');
    }
  }, [recStatus]);

  const handleMessageFromBackground = (message: string | ControlAction): void => {
    if (message as ControlAction === ControlAction.START) setRecStatus('on');
    else if (message as ControlAction === ControlAction.STOP) setRecStatus('paused');
    else if (message as ControlAction === ControlAction.RESET) setRecStatus('off');
    else setLastBlock(message as string);
  };

  React.useEffect((): () => void => {
    chrome.storage.local.get(['status', 'codeBlocks'], result => {
      if (result.codeBlocks) setCodeBlocks(result.codeBlocks);
      if (result.status === 'on') setRecStatus('on');
      else if (result.status === 'paused') setRecStatus('paused');
      chrome.runtime.onMessage.addListener(handleMessageFromBackground);
    });
    chrome.tabs.query({ active: true, currentWindow: true }, activeTab => {
      if (activeTab[0].url.startsWith('chrome://')) setIsValidTab(false);
    });
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessageFromBackground);
    };
  }, []);

  const startRecording = () => {
    chrome.runtime.sendMessage(ControlAction.START);
    setRecStatus('on');
  };

  const stopRecording = () => {
    chrome.runtime.sendMessage(ControlAction.STOP);
    setRecStatus('paused');
  };

  const resetRecording = () => {
    chrome.runtime.sendMessage(ControlAction.RESET);
    setRecStatus('off');
  };

  const handleToggle = (action: ControlAction): void => {
    if (action === ControlAction.START) startRecording();
    else if (action === ControlAction.STOP) stopRecording();
    else if (action === ControlAction.RESET) resetRecording();
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

  const destroyBlock = (index: number): void => {
    setCodeBlocks(codeBlocks.slice(0, index).concat(codeBlocks.slice(index + 1)));
    chrome.runtime.sendMessage({
      type: ControlAction.DELETE,
      payload: index,
    });
  };

  return (
    <div id="App">
      <Header shouldInfoDisplay={shouldInfoDisplay} toggleInfoDisplay={toggleInfoDisplay} />
      {
        (shouldInfoDisplay
          ? <Info />
          : (
            <Body
              codeBlocks={codeBlocks}
              recStatus={recStatus}
              isValidTab={isValidTab}
              destroyBlock={destroyBlock}
            />
          )
        )
      }
      <Footer
        isValidTab={isValidTab}
        recStatus={recStatus}
        handleToggle={handleToggle}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
};
