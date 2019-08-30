import { isNull, isNullOrUndefined } from '../shared/is';
import mountChildren from './mountChildren';
import reconcileChildFibers from './reconcileChildFibers';

export default function reconcileChildren (
  current,
  workInProgress,
  nextChild
) {
  if (isNullOrUndefined(current)) {
    workInProgress.child = mountChildren(
      workInProgress,
      isNull(current) ? null : current.child,
      nextChild
    )
  } else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      isNull(current) ? null : current.child,
      nextChild
    )
  }
}