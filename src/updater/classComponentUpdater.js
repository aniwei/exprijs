import { enqueueUpdate, createUpdate } from './index';
import { isFunction } from '../shared/is';
import { getFiber } from '../fiber';
import { REPLACE_STATE, FORCE_UPDATE } from '../shared/updateTypes';

export default {
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

  enqueueReplaceState(
    instance, 
    payload, 
    callback
  ) {
    const fiber = getFiber(instance);
    const update = createUpdate();

    update.tag = REPLACE_STATE;
    update.payload = payload;

    if (isFunction(callback)) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },

  enqueueForceUpdate(
    instance, 
    callback
  ) {
    const fiber = getFiber(instance);
    const update = createUpdate();
    
    update.tag = FORCE_UPDATE;

    if (isFunction(callback)) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
};
