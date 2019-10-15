/**
 * Testing for popup file
 */

import { create, act } from 'react-test-renderer';
import App from '../popup/components/App.tsx';

let root;

describe('Popup', () => {
  beforeAll(() => {
    act(() => {
      root = create(<App />);
    });
  });

  it('Should open connection to extension on mount')
  
  describe('Toggle button', () => {
    
    it('Should say `Start recording` initially, and toggle its text on click', () => {

    });

    it('Should send message to background to start recording when toggled on', () => {
    
    });

    it('Should send message to background to stop recording when toggled off', () => {

    });
  });

  describe('Code view', () => {
    it('Should display results of code generation when recording stops', () => {

    });

    it('Should be empty when recording starts', () => {

    });
  });
});
