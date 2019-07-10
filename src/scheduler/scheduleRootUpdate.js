import { isFunction } from '../shared/is';
import createUpdate from './updater/createUpdate';
import enqueueUpdate from './updater/enqueueUpdate';
import requestWork from './worker/requestWork';
import { addRootToSchedule } from './index';

export default function scheduleRootUpdate(
  current,
  element,
  callback
) {
  addRootToSchedule(current);
  const update = createUpdate();

  update.payload = { element };

  if (isFunction) {
    update.callback = callback;
  }

  enqueueUpdate(current, update)
  requestWork(current);
}