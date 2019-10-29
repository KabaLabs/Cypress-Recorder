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

  const startRecording = (): void => {
    setRecStatus('on');
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
  };

  const stopRecording = (): void => {
    setRecStatus('paused');
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
  };

  const resetRecording = (): void => {
    setRecStatus('off');
    setCodeBlocks([]);
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
  };

  React.useEffect((): void => {
    chrome.storage.local.get(['status', 'codeBlocks'], result => {
      if (result.codeBlocks) setCodeBlocks(result.codeBlocks);
      if (result.status === 'on') setRecStatus('on');
      else if (result.status === 'paused') setRecStatus('paused');
    });
    chrome.tabs.query({ active: true, currentWindow: true }, activeTab => {
      if (activeTab[0].url.startsWith('chrome://')) setIsValidTab(false);
    });
  }, []);

  React.useEffect((): () => void => {
    function handleMessageFromBackground(message: string | ControlAction): void {
      if (message as ControlAction === ControlAction.START && isValidTab) startRecording();
      else if (message as ControlAction === ControlAction.STOP) stopRecording();
      else if (message as ControlAction === ControlAction.RESET) resetRecording();
      else setCodeBlocks([...codeBlocks, message as string]);
    }
    chrome.runtime.onMessage.addListener(handleMessageFromBackground);
    return () => {
      chrome.runtime.onMessage.addListener(handleMessageFromBackground);
    };
  }, [codeBlocks, shouldInfoDisplay]);

  const handleToggle = (action: ControlAction): void => {
    if (action === ControlAction.START) startRecording();
    else if (action === ControlAction.STOP) stopRecording();
    else if (action === ControlAction.RESET) resetRecording();
    chrome.runtime.sendMessage({ type: action });
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

  const moveBlock = (dragIdx: number, dropIdx: number): void => {
    const temp = [...codeBlocks];
    const dragged = temp.splice(dragIdx, 1)[0];
    temp.splice(dropIdx, 0, dragged);
    setCodeBlocks(temp);
    chrome.runtime.sendMessage({
      type: ControlAction.MOVE,
      payload: { dragIdx, dropIdx },
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
              moveBlock={moveBlock}
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
