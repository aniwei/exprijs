import { enqueueUpdate, createUpdate } from "../updater";
import { isFunction } from "../shared/is";
import { performWork } from "./worker";

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

  schedulWork(current)
}

export function schedulRootWork () {

}

export function schedulWork (fiber) {
  performWork(fiber);
}