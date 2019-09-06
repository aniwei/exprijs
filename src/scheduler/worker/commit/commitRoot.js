import { isNullOrUndefined } from '../../../shared/is';
import { PERFORMED_WORK } from '../../../shared/effectTags';
import ReactCurrentOwner from '../../../react/ReactCurrentOwner';
import commitAllHostEffects from './commitAllHostEffects';
import commitAllLifeCycles from './commitAllLifeCycles';
import worker from '../index';

export default function commitRoot (
  root,
  finishedWork
) {
  worker.isCommitting = true;
  worker.isWorking = true;

  if (!isNullOrUndefined(finishedWork)) {
    root.finishedWork = null;
  }

  let firstEffect;
  if (finishedWork.effectTag > PERFORMED_WORK) {
    if (!isNullOrUndefined(finishedWork.lastEffect)) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    firstEffect = finishedWork.firstEffect;
  }

  if (!isNullOrUndefined(firstEffect)) {
    ReactCurrentOwner.current = null;
  }

  worker.nextEffect = firstEffect;

  while (!isNullOrUndefined(worker.nextEffect)) {
    commitAllHostEffects();

    if (!isNullOrUndefined(worker.nextEffect)) {
      worker.nextEffect = nextEffect.nextEffect;
    }
  }

  root.current = finishedWork;
  worker.nextEffect = firstEffect;

  while (!isNullOrUndefined(worker.nextEffect)) {
    commitAllLifeCycles(root);

    if (!isNullOrUndefined(worker.nextEffect)) {
      worker.nextEffect = nextEffect.nextEffect;
    }
  }

  if (!isNullOrUndefined(firstEffect)) {

  }

  worker.isCommitting = false;
  worker.isWorking = false;
}