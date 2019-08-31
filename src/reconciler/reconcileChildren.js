import { isNull, isNullOrUndefined } from '../shared/is';
import mountChildFibers from './mountChildFibers';
import reconcileChildFibers from './reconcileChildFibers';

export default function reconcileChildren (
  current,
  workInProgress,
  nextChild
) {
  if (isNullOrUndefined(current)) {
    workInProgress.child = mountChildFibers(
      workInProgress,
      isNullOrUndefined(current) ? null : current.child,
      nextChild
    )
  } else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      isNullOrUndefined(current) ? null : current.child,
      nextChild
    )
  }
}