import requestIdleCallback from 'requestidlecallback';
import performWork from './performWork';
import scheduler from '../index';

export default function requestWork (fiber) {
  if (scheduler.isRootRendering) {
    performWork(null, fiber, true);
  } else {
    requestIdleCallback.request((deadline) => {
      performWork(deadline, fiber);
    });
  }
}