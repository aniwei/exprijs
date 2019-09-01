import { isNullOrUndefined } from '../../shared/is';
import { UPDATE } from '../../shared/effectTags';
import commitLifeCycles from './commitLifeCycles';

import worker from './index';

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