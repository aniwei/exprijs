import { PLACEMENT } from '../../shared/effectTags';
import { isNull } from '../../shared/is';
import processUpdateQueue from './processUpdateQueue';

export default function updateHostRoot (current, workInProgress) {
  let updateQueue = workInProgress.updateQueue;

  debugger;

  if (!isNull(updateQueue)) {
    const nextProps = workInProgress.pendingProps;
    const prevState = workInProgress.memoizedState;
    const prevChildren = !isNull(prevState) ? prevState.element : null;
    
    processUpdateQueue(
      workInProgress,
      updateQueue,
      nextProps,
      null,
    );

    const nextState = workInProgress.memoizedState;
    const nextChildren = nextState.element;

    if (nextChildren === prevChildren) {
      // resetHydrationState();
      // return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }
  }

  const root = workInProgress.stateNode;

  if (
    (isNull(current) || isNull(current.child)) //&&
    // root.hydrate
    // enterHydrationState(workInProgress)
  ) {
    workInProgress.effectTag |= PLACEMENT;

    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
    );
  } else {
    // Otherwise reset hydration state in case we aborted and resumed another
    // root.
    resetHydrationState();
    reconcileChildren(current, workInProgress, nextChildren);
  }
  return workInProgress.child;
}