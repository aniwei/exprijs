import { isFunction } from '../shared/is';
import createUpdate from './updater/createUpdate';
import enqueueUpdate from './updater/enqueueUpdate';
import requestWork from './worker/requestWork';

export default function scheduleRootUpdate(
  current,
  element,
  callback
) {
  const update = createUpdate();

  update.payload = { element };

  if (isFunction) {
    update.callback = callback;
  }


  enqueueUpdate(current, update)
  requestWork(current);
}