import { isNullOrUndefined } from '../../shared/is';
import completeUnitOfWork from './completeUnitOfWork';
import beginWork from './beginWork';

export default function performUnitOfWork (
  workInProgress
) {
  if (!workInProgress) {
    debugger;
  }
  const current = workInProgress.alternate;
  let next = beginWork(current, workInProgress);

  workInProgress.memoizedProps= workInProgress.pendingProps;

  if (isNullOrUndefined(next)) {
    next = completeUnitOfWork(workInProgress);
  }

  return next;
}