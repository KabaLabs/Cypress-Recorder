import * as React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ActiveRecordingBox } from './ActiveRecordingBox';
import { CodeDisplay } from './CodeDisplay';
import { LandingBox } from './LandingBox';
// import { EventData } from '../../types/types';

export type RecStatus =
  | 'off'
  | 'on'
  | 'done';

export type RecAction =
  | 'startRec'
  | 'stopRec'
  | 'resetRec';

function handleToggle(action: RecAction) {
  if (action === 'startRec') {
    
  }
}

export const App: React.FC = () => {
  const [recStatus, setRecStatus] = React.useState('off');
  // const [recState, dispatch] = React.useReducer(recReducer, { recStatus: 'off' });
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
