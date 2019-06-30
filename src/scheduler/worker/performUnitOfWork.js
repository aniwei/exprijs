import { isNull } from '../../shared/is';
import beginWork from './beginWork';
import completeUnitOfWork from './completeUnitOfWork';

export default function performUnitOfWork (workInProgress) {
  const { alternate: current } = workInProgress;
  let next = beginWork(
    current, 
    workInProgress
  );

  if (isNull(next)) {
    next = completeUnitOfWork(workInProgress);
  }

  return next;
}