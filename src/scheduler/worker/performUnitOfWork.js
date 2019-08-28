import { isNull } from '../../shared/is';
import completeUnitOfWork from './completeUnitOfWork';

export default function performUnitOfWork (
  workInProgress
) {
  const current = workInProgress.alternate;
  let next = beginWork(current, workInProgress);

  workInProgress.memoizedProps= workInProgress.pendingProps;

  if (isNull(next)) {
    next = completeUnitOfWork(workInProgress);
  }

  return next;
}