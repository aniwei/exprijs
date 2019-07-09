import { pendingCommit, nextUnitOfWork, ENOUGH_TIME } from '../../shared';
import * as shared from '../../shared';

import resetNextUnitOfWork from './resetNextUnitOfWork';
import performUnitOfWork from './performUnitOfWork';
import commitAllWork from './commitAllWork';

export const workLoop = deadline => {
  if (!shared.nextUnitOfWork) {
    resetNextUnitOfWork();
  }

  while (shared.nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    shared.nextUnitOfWork = performUnitOfWork(shared.nextUnitOfWork);
  }
  if (shared.pendingCommit) {
    commitAllWork(shared.pendingCommit);
  }
};