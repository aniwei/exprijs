import worker from './index';
import workLoop from './workLoop';
import requestIdleCallback from 'requestidlecallback';

export function performWork (deadline) {
  workLoop(deadline);

  const { nextUnitOfWork } = worker;

  if (nextUnitOfWork) {
    requestIdleCallback(performWork);
  }
}
