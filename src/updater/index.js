import { UPDATE_STATE } from "../shared/updateTypes";
import { isNull, isFunction } from "../shared/is";
import { getFiber } from "../fiber";;

export const classComponentUpdater = {
  isMounted,
  
  enqueueSetState (
    instance, 
    payload, 
    callback
  ) {
    const fiber = getFiber(instance);
    const update = createUpdate();

    update.payload = payload;
    
    if (isFunction(callback)) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },

  enqueueReplaceState(inst, payload, callback) {
    const fiber = getInstance(inst);
    const currentTime = requestCurrentTime();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );

    const update = createUpdate(expirationTime, suspenseConfig);
    update.tag = ReplaceState;
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, 'replaceState');
      }
      update.callback = callback;
    }

    if (revertPassiveEffectsChange) {
      flushPassiveEffects();
    }
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
  enqueueForceUpdate(inst, callback) {
    const fiber = getInstance(inst);
    const currentTime = requestCurrentTime();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );

    const update = createUpdate(expirationTime, suspenseConfig);
    update.tag = ForceUpdate;

    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, 'forceUpdate');
      }
      update.callback = callback;
    }

    if (revertPassiveEffectsChange) {
      flushPassiveEffects();
    }
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
};

function appendUpdateToQueue (
  queue,
  update,
) {
  
  if (queue.lastUpdate === null) {
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
}

function commitUpdateEffects (
  effect,
  instance,
) {
  while (!isNull(effect)) {
    const callback = effect.callback;

    if (!isNull(callback)) {
      effect.callback = null;
      callCallback(callback, instance);
    }

    effect = effect.nextEffect;
  }
}


export function createUpdate () {
  return {
    tag: UPDATE_STATE,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null
  };
}

export function enqueueUpdate (
  fiber, 
  update
) {
  const { alternate } = fiber;
  let firstQueue;
  let secondQueue;

  if (isNull(alternate)) {
    firstQueue = fiber.updateQueue || (fiber.updateQueue = createUpdateQueue(fiber.memoizedState));
    secondQueue = null;
  } else {
    firstQueue = fiber.updateQueue;
    secondQueue = alternate.updateQueue;

    if (isNull(firstQueue)) {
      if (isNull(secondQueue)) {
        firstQueue = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        secondQueue = alternate.updateQueue = createUpdateQueue(
          alternate.memoizedState,
        );
      } else {
        firstQueue = fiber.updateQueue = cloneUpdateQueue(secondQueue);
      }
    } else {
      if (isNull(secondQueue)) {
        secondQueue = alternate.updateQueue = cloneUpdateQueue(firstQueue);
      }
    }
  }

  if (isNull(secondQueue) || firstQueue === secondQueue) {
    appendUpdateToQueue(firstQueue, update);
  } else {
    if (isNull(firstQueue.lastUpdate) || isNull(secondQueue.lastUpdate)) {
      appendUpdateToQueue(firstQueue, update);
      appendUpdateToQueue(secondQueue, update);
    } else {
      appendUpdateToQueue(firstQueue, update);
      secondQueue.lastUpdate = update;
    }
  }
}


export function createUpdateQueue (baseState) {
  const queue = {
    baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null,
  };
  
  return queue;
}