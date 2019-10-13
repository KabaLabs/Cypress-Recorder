import * as React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ActiveRecordingBox } from './ActiveRecordingBox';
import { CodeDisplay } from './CodeDisplay';
import { LandingBox } from './LandingBox';
import { RecAction, RecordedSession } from '../../types/types';

export type RecState =
  | 'off'
  | 'on'
  | 'done';

export const App: React.FC = () => {
  const [recStatus, setRecStatus] = React.useState<RecState>('off');
  const [session, setSession] = React.useState<RecordedSession>({ events: [] });

  const handleToggle = (action: RecAction) => {
    if (action.type === 'startRec') {
      setRecStatus('on');
      chrome.runtime.sendMessage(action);
    } else if (action.type === 'stopRec') {
      setRecStatus('done');
      chrome.runtime.sendMessage(action, (response: RecordedSession) => {
        console.log(response);
        setSession(response);
      });
    } else if (action.type === 'resetRec') {
      setRecStatus('off');
      chrome.runtime.sendMessage(action);
    }
  };

  React.useEffect(() => {
    chrome.storage.local.get(['status', 'session'], (result) => {
      if (!result.status) chrome.storage.local.set({ status: recStatus });
      else if (result.status === 'on') setRecStatus('on');
      else if (result.status === 'done') setRecStatus('done');
      if (result.session) setSession(result.session);
    });
  }, []);

  React.useEffect(() => {
    chrome.storage.local.set({ status: recStatus });
  }, [recStatus]);

  React.useEffect(() => {
    chrome.storage.local.set({ session: session });
  }, [session]);

  return (
    <div id="App">
      <Header />
      {recStatus === 'off' && <LandingBox />}
      {recStatus === 'on' && <ActiveRecordingBox />}
      {recStatus === 'done' && <CodeDisplay session={session}/>}
      <Footer recStatus={recStatus} handleToggle={handleToggle}/>
    </div>
  );
};
