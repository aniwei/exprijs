import { isFunction } from '../../shared/is';
import createUpdate from './createUpdate';
import enqueueUpdate from './enqueueUpdate';

const classComponentUpdater = {
  enqueueSetState (
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

  }
}

export default classComponentUpdater;