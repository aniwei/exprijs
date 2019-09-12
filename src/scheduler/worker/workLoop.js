import worker from './index';
import performUnitOfWork from './performUnitOfWork';
import { createWorkInProgress } from '../../reconciler/FiberNode';
import { isNullOrUndefined } from '../../shared/is';
import { EXPIRE_TIME } from '../../shared';

export default function workLoop (
  deadline, 
  fiber,
) {
  if (!worker.nextUnitOfWork) {
    worker.nextUnitOfWork = createWorkInProgress(fiber, null);
  }

  while (
    !isNullOrUndefined(worker.nextUnitOfWork) && 
    deadline.timeRemaining() > EXPIRE_TIME
  ) {
    worker.nextUnitOfWork = performUnitOfWork(worker.nextUnitOfWork);
  }
}