import worker from './index';
import performUnitOfWork from './performUnitOfWork';
import { createWorkInProgress } from '../../reconciler/FiberNode';
import { isNull, isNullOrUndefined } from '../../shared/is';
import { EXPIRE_TIME } from '../../shared';

export default function workLoop (
  deadline, 
  root,
) {
  const { current } = root;
  if (!worker.nextUnitOfWork) {
    worker.nextUnitOfWork = createWorkInProgress(current, null);
  }

  while (
    !isNullOrUndefined(worker.nextUnitOfWork)
    // deadline.timeRemaining() > EXPIRE_TIME
  ) {
    worker.nextUnitOfWork = performUnitOfWork(worker.nextUnitOfWork);
  }
}