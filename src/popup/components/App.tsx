import * as React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ActiveRecordingBox } from './ActiveRecordingBox';
import { CodeDisplay } from './CodeDisplay';
import { LandingBox } from './LandingBox';
// import { EventData } from '../../types/types';

export type RecState =
  | { recStatus: 'off' }
  | { recStatus: 'on' }
  | { recStatus: 'done' };

export type RecAction =
  | { type: 'startRec' }
  | { type: 'stopRec' }
  | { type: 'resetRec' };

function init(): RecState {
  
  return { recStatus: 'off' };
};

function recReducer(state: RecState, action: RecAction): RecState {
  chrome.runtime.sendMessage({ type: action.type })
  switch (action.type) {
    case 'startRec':
      chrome.storage.local.set({ recStatus: 'on' });
      return { recStatus: 'on' };
    case 'stopRec':
        chrome.storage.local.set({ recStatus: 'done' });
      return { recStatus: 'done' };
    case 'resetRec':
      chrome.storage.local.set({ recStatus: 'off' });
      return { recStatus: 'off' };
    default:
      return state;
  }
}

export const RecDispatch = React.createContext(null);

export const App: React.FC = () => {
  const [recState, dispatch] = React.useReducer(recReducer, { recStatus: 'off' });
  React.useEffect(() => {
    chrome.storage.local.get('recStatus', (status: String) => {
      if (status) {
        if (status === 'on') dispatch({ type: 'startRec' });
        else if (status === 'done') type = 'resetRec';
        dispatch({ type });
      }
    });
  }, []);
  return (
    <div id="App">
      <Header />
      {recState.recStatus === 'off' && <LandingBox />}
      {recState.recStatus === 'on' && <ActiveRecordingBox />}
      {recState.recStatus === 'done' && <CodeDisplay />}
      <RecDispatch.Provider value={dispatch}>
        <Footer recStatus={recState.recStatus}/>
      </RecDispatch.Provider>
    </div>
  );
};
