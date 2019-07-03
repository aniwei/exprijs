
import enqueueUpdate from './updater/enqueueUpdate';
import createUpdate from './updater/createUpdate';
import schedulWork from './scheduleWork';
import { isFunction } from "../shared/is";

export function schedulUpdate (
  instance,
  payload,
  callback
) {
  const { __reactInternalFiber: current } = instance;
  const update = createUpdate();
  update.payload = payload;

  if (isFunction(callback)) {
    update.callback = callback;
  }

  enqueueUpdate(
    current,
    update
  );

  schedulWork(current, false);
}

export function schedulRootUpdate (
  current, 
  element, 
  callback
) {
  const update = createUpdate();
  update.payload = { element };

  if (isFunction(callback)) {
    update.callback = callback;
  }

  enqueueUpdate(
    current,
    update
  );

  schedulWork(current, false);
}
