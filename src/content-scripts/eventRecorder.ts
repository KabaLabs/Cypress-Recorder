import { controlActionTypes } from '../types/types';
import eventTypes from '../constants/events';
import { EventStore } from '../helpers/DataStore';

function initialize(): void {
  console.log('eventRecorder initialized');
  const port: chrome.runtime.Port = chrome.runtime.connect({ name: 'eventRecorderConnection' });
}

function handleControlMessages(action: controlActionTypes): void {
  if (action && action.type) {
    switch (action.type) {
      case 'startRec':
        addListeners();
        break;
      case 'stopRec':
        removeListeners();
        break;
      case 'resetRec':
        break;
    }
  }
}

function handleEvent(event: Event): void {

}

function addListeners(): void {
  Object.values(eventTypes).forEach(eventType => {
    document.addEventListener(eventType, handleEvent, {
      capture: true,
      passive: true,
    });
  });
}

function removeListeners(): void {

}

initialize();
