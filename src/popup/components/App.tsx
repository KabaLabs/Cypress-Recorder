import * as React from 'react';
import Header from './Header';
import Info from './Info';
import Footer from './Footer';
import Body from './Body';
import { RecState, Block, Action } from '../../types';
import { ControlAction } from '../../constants';
import '../../assets/styles/styles.scss';

const App: React.FunctionComponent = () => {
  const [recStatus, setRecStatus] = React.useState<RecState>('off');
  const [codeBlocks, setCodeBlocks] = React.useState<Block[]>([]);
  const [shouldInfoDisplay, setShouldInfoDisplay] = React.useState<boolean>(false);
  const [isValidTab, setIsValidTab] = React.useState<boolean>(true);

  const startRecording = (): void => {
    setRecStatus('on');
  };
  const stopRecording = (): void => {
    setRecStatus('paused');
  };
  const resetRecording = (): void => {
    setRecStatus('off');
    setCodeBlocks([]);
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
    function handleMessageFromBackground({ type, payload }: Action): void {
      setShouldInfoDisplay(false);
      if (type === ControlAction.START && isValidTab) startRecording();
      else if (type === ControlAction.STOP) stopRecording();
      else if (type === ControlAction.RESET) resetRecording();
      else if (type === ControlAction.PUSH) setCodeBlocks(blocks => [...blocks, payload]);
    }
    chrome.runtime.onMessage.addListener(handleMessageFromBackground);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessageFromBackground);
    };
  }, []);

  const handleToggle = (action: ControlAction): void => {
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
    if (action === ControlAction.START) startRecording();
    else if (action === ControlAction.STOP) stopRecording();
    else if (action === ControlAction.RESET) resetRecording();
    chrome.runtime.sendMessage({ type: action });
  };

  const toggleInfoDisplay = (): void => {
    setShouldInfoDisplay(should => !should);
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      let toBeCopied: string = '';
      for (let i = 0; i !== codeBlocks.length; i += 1) {
        toBeCopied += codeBlocks[i].value.concat('\n');
      }
      await navigator.clipboard.writeText(toBeCopied);
    } catch (error) {
      throw new Error(error);
    }
  };

  const destroyBlock = (index: number): void => {
    setCodeBlocks(prevBlocks => prevBlocks.filter((block, i) => i !== index));
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

export default App;
