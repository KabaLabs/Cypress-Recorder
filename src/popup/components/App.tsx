import * as React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ActiveRecordingBox } from './ActiveRecordingBox';
import { CodeDisplay } from './CodeDisplay';
import { LandingBox } from './LandingBox';
import { RecAction } from '../../types/types';

export type RecState =
  | 'off'
  | 'on'
  | 'done';

export const App: React.FC = () => {
  const [recStatus, setRecStatus] = React.useState<RecState>('off');

  const handleToggle = (action: RecAction) => {
    chrome.runtime.sendMessage(action);
    if (action.type === 'startRec') setRecStatus('on');
    else if (action.type === 'stopRec') setRecStatus('done');
    else if (action.type === 'resetRec') setRecStatus('off');
  };

  React.useEffect(() => {
    chrome.storage.local.get('status', (result) => {
      console.log(result.status);
      if (!result.status) chrome.storage.local.set({ status: recStatus });
      else if (result.status === 'on') setRecStatus('on');
      else if (result.status === 'done') {
        setRecStatus('done');
        // additional call to get events from storage
      }
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
      {recStatus === 'done' && <CodeDisplay />}
      <Footer recStatus={recStatus} handleToggle={handleToggle}/>
    </div>
  );
};
