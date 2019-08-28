import { isNull } from '../shared/is';

export default function reconcileChildren (
  current,
  workInProgress,
  nextChild
) {
  workInProgress.child = mountChildren(
    workInProgress,
    isNull(current) ? null : current.child,
    nextChild
  )
}