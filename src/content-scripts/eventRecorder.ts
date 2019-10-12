function initialize() {
  console.log('eventRecorder initialized');
  chrome.runtime.connect({ name: 'eventRecorderConnection' });
}

initialize();
