import { pendingCommit, nextUnitOfWork, ENOUGH_TIME } from '../../shared';
import worker from './index';

import resetNextUnitOfWork from './resetNextUnitOfWork';
import performUnitOfWork from './performUnitOfWork';
import commitAllWork from './commitAllWork';

export default function workLoop (deadline) {
  if (!worker.nextUnitOfWork) {
    resetNextUnitOfWork();
  }

  while (worker.nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    worker.nextUnitOfWork = performUnitOfWork(worker.nextUnitOfWork);
  }
  if (worker.pendingCommit) {
    commitAllWork(worker.pendingCommit);
  }
};