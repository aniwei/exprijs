import pushHostRootContext from '../../context/pushHostRootContext';
import reconcileChildren from '../../reconciler/reconcileChildren';

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
      (current === null || current.child === null) &&
      root.hydrate &&
      enterHydrationState(workInProgress)
    ) {
      workInProgress.effectTag |= Placement;

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

  return workInProgress.child;
}