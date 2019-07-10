import { CALLBACK } from '../../shared/effectTags';
import { isNull } from '../../shared/is';
import getStateFromUpdate from './getStateFromUpdate';

export default function processUpdateQueue (workInProgress, queue, props, instance) {
  let newBaseState = queue.firstUpdate;
  let newFirstUpdate = null;

  let update = queue.firstUpdate;
  let resultState = newBaseState;

  while (!isNull(update)) {
    resultState = getStateFromUpdate(
      workInProgress,
      queue,
      update,
      resultState,
      props,
      instance
    );

    const callback = update.callback;

    if (isFunction(callback)) {
      workInProgress.effectTag |= CALLBACK;
      update.nextEffect = null;

      if (isNull(queue.lastEffect)) {
        queue.firstEffect = queue.lastEffect = update;
      } else {
        queue.lastEffect.nextEffect = update;
        queue.lastEffect = update;
      }
    }

    update = update.next;
  }

  if (isNull(newFirstUpdate)) {
    queue.lastUpdate = null;
  }
  
  if (
    isNull(newFirstUpdate) && 
    isNull(newFirstCapturedUpdate)
  ) {
    newBaseState = resultState;
  }

  queue.baseState = newBaseState;
  queue.firstUpdate = newFirstUpdate;

  workInProgress.memoizedState = resultState;
}