import worker from './index';
import { isNullOrUndefined } from '../../shared/is';
import { UPDATE } from '../../shared/effectTags';

export default function commitAllLifeCycles (
  root
) {
  while (!isNullOrUndefined(worker.nextEffect)) {
    const { effectTag } = worker.nextEffect;

    if (effectTag & UPDATE) {
      const current = worker.nextEffect.alternate;

      commitLifeCycles(root, current, worker.nextEffect)
    }

    worker.nextEffect = worker.nextEffect.nextEffect;
  }
}