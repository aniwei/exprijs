import worker from './index';
import completeWork from './completeWork';
import { isNull } from '../../shared/is';

export default function completeUnitOfWork (workInProgress) {
  while (true) {
    const returnFiber = workInProgress.return;
    const siblingFiber = workInProgress.sibling;

    worker.nextUnitOfWork = completeWork(workInProgress);

    if (!isNull(siblingFiber)) {
      return siblingFiber
    }

    if (!isNull(returnFiber)) {
      return returnFiber;
    }

    return null;
  }
}