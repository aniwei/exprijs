import createUpdate from './createUpdate';
import enqueueUpdate from './enqueueUpdate';
import scheduleWork from '../scheduleWork';

import { FORCE_UPDATE } from '../../shared/updateTags';

import { isFunction } from '../../shared/is';

const classComponentUpdater = {
  enqueueSetState(
    instance, 
    payload, 
    callback
  ) {
    const fiber = instance._reactInternalFiber;

    const update = createUpdate();
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
    const fiber = instance._reactInternalFiber;

    const update = createUpdate();
    update.tag = FORCE_UPDATE;

    if (isFunction(callback)) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },
}

export default classComponentUpdater;