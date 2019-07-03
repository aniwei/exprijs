import {
  ASYNC,
  SYNC
} from '../shared/modeTypes';
import {
  performSyncWork,
  performAsyncWork
} from './worker/performWork'

export default function schedulWork (
  current,
  mode
) {

  if (mode === ASYNC) {
    performAsyncWork();
  } else {
    performSyncWork();
  }
}