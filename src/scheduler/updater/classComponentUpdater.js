import { REACT_INTERNAL_FIBER, WORKING } from '../../shared';
import { REPLACE_STATE, FORCE_UPDATE } from '../../shared/updateTags';
import scheduleWork from '../worker/scheduleWork';
import createUpdate from './createUpdate';
import enqueueUpdate from './enqueueUpdate';
import { isFunction } from '../../shared/is';

const classComponentUpdater = {
  isMounted (Component) {
    return instance._reactInternalFiber ? true : false;
  },
  enqueueSetState(instance, payload, callback) {
    const fiber = instance._reactInternalFiber;
    const update = createUpdate();
    
    update.payload = payload;

    if (isFunction(callback)) {
      update.callback = callback;
    }

    fiber.status = WORKING;
    
    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },

  enqueueReplaceState(instance, payload, callback) {
    const fiber = instance[REACT_INTERNAL_FIBER];

    const update = createUpdate();
    update.tag = REPLACE_STATE;
    update.payload = payload;

    if (isFunction(callback)) {
      update.callback = callback;
    }

    fiber.status = WORKING;
    
    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },

  enqueueForceUpdate(instance, callback) {
    const fiber = instance[REACT_INTERNAL_FIBER];
    const update = createUpdate();
    update.tag = FORCE_UPDATE;

    fiber.status = WORKING;

    if (isFunction(callback)) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },
};

export default classComponentUpdater;