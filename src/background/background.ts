import { controlAction } from '../types/types';


function startRecording(): void {
  chrome.runtime.onConnect.addListener((port) => {
    console.log(`connection between content script and background opened on port ${port}`);
    port.onDisconnect.addListener(() => {
      console.log('connection between content script and background closed');
    });
  });
  chrome.tabs.executeScript({ file: 'eventRecorder.js', allFrames: true }, (res) => {
    const lastErr = chrome.runtime.lastError;
    if (lastErr) console.log(lastErr);
  });
}

function stopRecording(): void {
  // chrome.runtime.
}

function resetRecording(): void {

}

function recordingRouter(action: controlAction): void {
  if (action && action.type) {
    switch (action.type) {
      case 'startRec':
        startRecording();
        break;
      case 'stopRec':
        stopRecording();
        break;
      case 'resetRec':
        resetRecording();
        break;
      default:
        throw new Error('Invalid action type');
    }
  }
}

function initialize(): void {
  chrome.runtime.onMessage.addListener(recordingRouter);
}

initialize();
