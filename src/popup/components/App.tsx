import * as React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ActiveRecordingBox } from './ActiveRecordingBox';
import { CodeDisplay } from './CodeDisplay';
import { LandingBox } from './LandingBox';

export type RecState =
  | { recStatus: 'off' }
  | { recStatus: 'on' }
  | { recStatus: 'done', data: RecData };

type RecordedEvent = {
  type: String,
  frameId: Number,
}

type RecData = RecordedEvent[];

export type RecAction =
  | { type: 'startRec' }
  | { type: 'stopRec', payload: RecData }
  | { type: 'resetRec' };

function recReducer(state: RecState, action: RecAction): RecState {
  switch (action.type) {
    case 'startRec':
      return { recStatus: 'on' };
    case 'stopRec':
      return { recStatus: 'done', data: action.payload };
    case 'resetRec':
      return { recStatus: 'off' };
    default:
      return state;
  }
}

export const RecDispatch = React.createContext(null);

export const App: React.FC = () => {
  const [recState, dispatch] = React.useReducer(recReducer, { recStatus: 'off' });
  // React.useEffect(() => {
  //   call to chrome.storage.local
  // }, []);
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
