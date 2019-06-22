import { enqueueUpdate, createUpdate } from "../updater";
import { isFunction } from "../shared/is";
import { HOST_ROOT, CLASS_COMPONENT, FUNCTION_COMPONENT } from '../shared/workTags';

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

  schedulWork(current);
}
