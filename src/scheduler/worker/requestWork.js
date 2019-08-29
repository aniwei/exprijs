import requestIdleCallback from 'requestidlecallback';
import performWork from './performWork';

export default function requestWork (root) {
  requestIdleCallback.request((deadline) => performWork(deadline, root));
}