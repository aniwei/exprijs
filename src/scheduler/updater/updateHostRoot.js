import { PLACEMENT } from '../../shared/effectTags';
import { isNullOrUndefined } from '../../shared/is';
import pushHostRootContext from '../../context/pushHostRootContext';
import reconcileChildren from '../../reconciler/reconcileChildren';
import processUpdateQueue from './processUpdateQueue';
import cloneChildFibers from '../../reconciler/cloneChildFibers'

export default function updateHostRoot (
  current,
  workInProgress,
) {
  // pushHostRootContext(workInProgress);
  let updateQueue = workInProgress.updateQueue;

  const pendingProps = workInProgress.pendingProps;
  const memoizedState = workInProgress.memoizedState;
  const children = !isNullOrUndefined(memoizedState) ? memoizedState.element : null;
  
  processUpdateQueue(
    workInProgress,
    updateQueue,
    pendingProps,
    null,
  );

  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  if (children === nextChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  reconcileChildren(current, workInProgress, nextChildren);

  return workInProgress.child;
}

function bailoutOnAlreadyFinishedWork (
  current,
  workInProgress
) {
  if (!isNullOrUndefined(current)) {
    workInProgress.firstContextDependency = current.firstContextDependency;
  }

  cloneChildFibers(current, workInProgress);

  return workInProgress.child;
}