import pushHostRootContext from '../../context/pushHostRootContext';
import reconcileChildren from '../../reconciler/reconcileChildren';
import { PLACEMENT } from '../../shared/effectTags';

export default function updateHostRoot (
  current,
  workInProgress,
) {
  pushHostRootContext(workInProgress);

  let updateQueue = workInProgress.updateQueue;

  if (isNull(updateQueue)) {
    const nextProps = workInProgress.pendingProps;
    const state = workInProgress.memoizedState;
    const prevChildren = !isNull(state) ? state.element : null;

    processUpdateQueue(
      workInProgress,
      updateQueue,
      nextProps,
      null,
      renderExpirationTime,
    );
    const nextState = workInProgress.memoizedState;
    const children = nextState.element;

    if (children === prevChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    const root = workInProgress.stateNode;
    
    if (
      (isNull(current) || isNull(current.child))
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
  
  return bailoutOnAlreadyFinishedWork(current, workInProgress)
}

function bailoutOnAlreadyFinishedWork (
  current,
  workInProgress
) {
  if (!isNull(current)) {
    workInProgress.firstContextDependency = current.firstContextDependency;
  }

  if (workInProgress.isNoWork) {
    return null;
  }

  cloneChildFibers(current, workInProgress);

  return workInProgress.child;
}