export type controlAction = {
  type: String,
}

function startRecording(): void {
  // chrome.runtime.onConnect()
  chrome.tabs.executeScript({ file: '../content-scripts/event-recorder.js', allFrames: true });
  
}

function stopRecording(): void {
  chrome.runtime.
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
