import worker from './index';
import performUnitOfWork from './performUnitOfWork';
import { createWorkInProgress } from '../../reconciler/FiberNode';
import { isNull, isNullOrUndefined } from '../../shared/is';
import { EXPIRE_TIME } from '../../shared';

export default function workLoopSync (
  fiber,
) {
  if (!worker.nextUnitOfWork) {
    worker.nextUnitOfWork = createWorkInProgress(fiber, null);
  }

  while (!isNullOrUndefined(worker.nextUnitOfWork)) {
    worker.nextUnitOfWork = performUnitOfWork(worker.nextUnitOfWork);
  }
}