import requestIdleCallback from 'requestidlecallback';
import performWork from './performWork';
import scheduler from '../index';

export default function requestWork (root) {
  if (!scheduler.isRendering) {
    requestIdleCallback.request((deadline) => performWork(deadline, root));
  }
}