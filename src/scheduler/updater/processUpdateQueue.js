import { isNullOrUndefined, isFunction } from '../../shared/is';
import cloneUpdateQueue from './cloneUpdateQueue';
import { UPDATE_STATE } from '../../shared/updateTags';
import { CALLBACK } from '../../shared/effectTags';

export default function processUpdateQueue (
  workInProgress,
  queue,
  props,
  instance
) {
  // copy queue
  if (!isNullOrUndefined(workInProgress.alternate)) {
    if (queue === workInProgress.alternate.updateQueue) {
      queue = workInProgress.updateQueue = cloneUpdateQueue(queue);
    }
  }

  let update = queue.firstUpdate;
  let state = queue.baseState;

  while (!isNullOrUndefined(update)) {
    state = getStateFromUpdate(workInProgress, queue, update, state, props, instance);
    const callback = update.callback;

    if (isFunction(callback)) {
      workInProgress.effectTag |= CALLBACK;
      update.nextEffet = null;

      if (isNullOrUndefined(queue.lastEffect)) {
        queue.firstEffect = queue.lastEffect = update;
      } else {
        queue.lastEffect.nextEffect = update;
        queue.lastEffect = update;
      }
    }

    update = update.next;
  }

  queue.firstUpdate = null;
  queue.lastUpdate = null;
  queue.baseState = state;
  workInProgress.memoizedState = state;
}

function getStateFromUpdate (
  workInProgress,
  queue,
  update,
  state,
  nextProps,
  instance
) {
  const { tag } = update;
  
  switch (tag) {
    case UPDATE_STATE: {
      const { payload } = update;
      let partialState;

      if (isFunction(payload)) {
        partialState = payload.call(instance, state, nextProps);
      } else {
        partialState = payload;
      }

      if (isNullOrUndefined(partialState)) {
        return state;
      }

      return {
        ...state,
        ...partialState
      }
    }
  }
}