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

  if (isNullOrUndefined(updateQueue)) {
    const nextProps = workInProgress.pendingProps;
    const state = workInProgress.memoizedState;
    const prevChildren = !isNullOrUndefined(state) ? state.element : null;

    processUpdateQueue(
      workInProgress,
      updateQueue,
      nextProps,
      null,
    );
    const nextState = workInProgress.memoizedState;
    const children = nextState.element;

    if (children === prevChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    const root = workInProgress.stateNode;
    
    if (
      (isNullOrUndefined(current) || isNullOrUndefined(current.child))
    ) {
      workInProgress.effectTag |= PLACEMENT;

      workInProgress.child = mountChildFibers(
        workInProgress,
        null,
        nextChildren,
        renderExpirationTime,
      );
    } else {
      reconcileChildren(current, workInProgress, nextChildren);
    }

    return workInProgress.child;
  }  
}

function bailoutOnAlreadyFinishedWork (
  current,
  workInProgress
) {
  if (!isNullOrUndefined(current)) {
    workInProgress.firstContextDependency = current.firstContextDependency;
  }

  if (workInProgress.isNoWork) {
    return null;
  }

  cloneChildFibers(current, workInProgress);

  return workInProgress.child;
}