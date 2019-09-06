import { isNullOrUndefined, isFunction } from '../../../shared/is';

export default function commitUpdateQueue (
  finishedWork, 
  finishedQueue, 
  instance,
) {
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
}


function commitUpdateEffects (
  effect,
  instance,
) {
  while (!isNullOrUndefined(effect)) {
    const callback = effect.callback;
    if (isFunction(callback)) {
      effect.callback = null;
      callback.call(instance);
    }
    effect = effect.nextEffect;
  }
}