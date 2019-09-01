import scheduleWork from '../worker/scheduleWork';
import createUpdate from './createUpdate';
import enqueueUpdate from './enqueueUpdate';
import { isFunction } from '../../shared/is';

const classComponentUpdater = {
  isMounted: false,
  enqueueSetState(instance, payload, callback) {
    const fiber = instance._reactInternalInstance;
    const update = createUpdate();
    
    update.payload = payload;

    if (isFunction(callback)) {
      update.callback = callback;
    }
    
    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },

  enqueueReplaceState(inst, payload, callback) {
    
  },

  enqueueForceUpdate(inst, callback) {
    
  },
};

export default classComponentUpdater;