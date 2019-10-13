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
    if (action === 'startRec') setRecStatus('on');
    if (action === 'stopRec') setRecStatus('done');
    if (action === 'resetRec') setRecStatus('off');
  };

  React.useEffect(() => {
    chrome.storage.local.get('recStatus', (status: String) => {
      if (status === 'on') setRecStatus('on');
      if (status === 'done') {
        setRecStatus('done');
        // additional call to get events from storage
      }
    });
    return () => {
      chrome.storage.local.set({ recStatus });
    };
  }, []);

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
