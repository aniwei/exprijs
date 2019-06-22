import ReactCurrentOwner from '../../react/owner';
import worker from './index';
import {
  PERFORMED_WORK
} from '../../shared/effectTags';

export default function commitRoot (root) {
  worker.isWorking = true;
  worker.isCommintting = true;

  ReactCurrentOwner.current = null;

  let firstEffect;

  if (finishedWork.effectTag > PERFORMED_WORK) {
    if (!isNull(finishedWork.lastEffect)) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  }

  prepareForCommit(root.container);

  nextEffect = firstEffect;

  while (!isNull(nextEffect)) {
    let didFatal = false;

  }


  worker.isCommintting = false;
  worker.isWorking = false;
}