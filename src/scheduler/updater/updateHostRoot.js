import { isNull } from '../../shared/is';
import processUpdateQueue from './processUpdateQueue';

function updateHostRoot (current, workInProgress) {
  pushHostRootContext(workInProgress);

  const queue = workInProgress.queue;

  const { 
    pendingProps: nextProps,
    memoizedState: prevState,
  } = workInProgress;

  const prevChildren = isNull(prevState) ? 
    null : prevState.element;

  processUpdateQueue(
    workInProgress,
    queue,
    nextProps,
    null
  );

  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  if (nextChildren === prev) {

  }

}

export default updateHostRoot;