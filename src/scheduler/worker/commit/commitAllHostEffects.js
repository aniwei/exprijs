import { PLACEMENT, UPDATE, DELETION, PLACEMENT_AND_UPDATE } from '../../../shared/effectTags';
import { isNullOrUndefined } from '../../../shared/is';
import commitPlacement from './commitPlacement';
import commitWork from './commitWork';
import worker from '../index';


export default function commitAllHostEffects () {
  while (!isNullOrUndefined(worker.nextEffect)) {
    const effectTag = worker.nextEffect.effectTag;
    const primaryEffectTag = effectTag & (PLACEMENT | UPDATE | DELETION);

    switch (primaryEffectTag) {
      case PLACEMENT: {
        commitPlacement(worker.nextEffect);

        worker.nextEffect.effectTag &= ~PLACEMENT;
        break;
      }

      case PLACEMENT_AND_UPDATE: {
        commitPlacement(worker.nextEffect);

        worker.nextEffect.effectTag &= ~PLACEMENT;

        const current = worker.nextEffect.alternate;
        commitWork(current, worker.nextEffect);
        break;
      }

      case UPDATE: {
        const current = worker.nextEffect.alternate;
        commitWork(current, worker.nextEffect);

        break;
      }

      case DELETION: {
        commitDeletion(worker.nextEffect);
        break;
      }
    }

    worker.nextEffect = worker.nextEffect.nextEffect;
  }
}