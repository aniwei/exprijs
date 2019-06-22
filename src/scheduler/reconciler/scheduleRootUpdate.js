import createUpdate from '../updater/createUpdate';
import enqueueUpdate from '../updater/enqueueUpdate';
import { isFunction } from '../../shared/is';
import { schedulWork } from './scheduler';


export default function schedulRootUpdate (
  current,
  element,
  callback
) {
  const update = createUpdate();
  update.payload = { element };

  if (isFunction(callback)) {
    update.callback = callback;
  }

  enqueueUpdate(current, update);
  schedulWork(current);
}