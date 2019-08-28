import { isNull } from '../../shared/is';
import reconcileChildren from '../../reconciler/reconcileChildren';

export default function updateHostComponent (
  current,
  workInProgress
) {
  const { type } = workInProgress;
  const nextProps = workInProgress.pendingProps;
  const props = isNull(current) ?
    current.memoizedProps: null;

  const children = nextProps.children;

  reconcileChildren(current, workInProgress, children);
  workInProgress.memoizedProps = nextProps;

  return workInProgress.child;
}