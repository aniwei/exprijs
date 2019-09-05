import { isFunction } from '../shared/is';
import scheduleWork from './worker/scheduleWork';
import enqueueUpdate from './updater/enqueueUpdate';
import createUpdate from './updater/createUpdate';
import scheduler from './index'


export default function scheduleRootUpdate(
  current, 
  element, 
  callback
) {
  const update = createUpdate();
  update.payload = { element };

  if (isFunction(callback)) {
    update.callback = callback;
  }

  scheduler.isRootRendering = true;

  enqueueUpdate(current, update);
  scheduleWork(current, element);
}