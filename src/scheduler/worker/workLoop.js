import worker from './index';
import performUnitOfWork from './performUnitOfWork';
import { createWorkProgress } from '../../reconciler/createWorkProgress';
import { isNull } from '../../shared/is';
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
    !isNull(worker.nextUnitOfWork) &&
    deadline.timeRemaining() > EXPIRE_TIME
  ) {
    worker.nextUnitOfWork = performUnitOfWork(worker.nextUnitOfWork);
  }
}