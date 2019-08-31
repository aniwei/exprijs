import worker from './index';
import performUnitOfWork from './performUnitOfWork';
import { createWorkProgress } from '../../reconciler/FiberNode';
import { isNull, isNullOrUndefined } from '../../shared/is';
import { EXPIRE_TIME } from '../../shared';

export default function workLoop (
  deadline, 
  root,
) {
  const { current } = root;
  if (!worker.nextUnitOfWork) {
    worker.nextUnitOfWork = createWorkProgress(current, null);
  }

  while (
    !isNullOrUndefined(worker.nextUnitOfWork) &&
    deadline.timeRemaining() > EXPIRE_TIME
  ) {
    worker.nextUnitOfWork = performUnitOfWork(worker.nextUnitOfWork);
  }
}