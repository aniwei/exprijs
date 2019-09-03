import { 
  NO_EFFECT,
  INCOMPLETE, 
  PERFORMED_WORK
} from '../../shared/effectTags';

import completeWork from './completeWork';
import { isNull, isContextProvider, isNullOrUndefined } from '../../shared/is';

export default function completeUnitOfWork (workInProgress) {
  do {
    const current = workInProgress.alternate;
    const returnFiber = workInProgress.return;
    const siblingFiber = workInProgress.sibling;

    if ((workInProgress.effectTag & INCOMPLETE) === NO_EFFECT) {
      let next = completeWork(current, workInProgress);

      if (!isNullOrUndefined(next)) {
        return next;
      }
      
      if (
        !isNullOrUndefined(returnFiber) &&
        ((returnFiber.effectTag & INCOMPLETE) === NO_EFFECT)
      ) {
        if (isNullOrUndefined(returnFiber.firstEffect)) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }

        if (!isNullOrUndefined(workInProgress.lastEffect)) {
          if (!isNullOrUndefined(returnFiber.lastEffect)) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }

          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        if (workInProgress.effectTag > PERFORMED_WORK) {
          if (!isNullOrUndefined(returnFiber.lastEffect)) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }
      }
  
    } else {
      const next = unwindWork(workInProgress);

      if (!isNullOrUndefined(next)) {
        next.effectTag &= HostEffectMask;
        return next;
      }

      if (!isNullOrUndefined(returnFiber)) {
        returnFiber.firstEffect = returnFiber.lastEffect = null;
        returnFiber.effectTag |= INCOMPLETE;
      }
    }

    if (!isNullOrUndefined(siblingFiber)) {
      return siblingFiber;
    }

    workInProgress = returnFiber;

  } while (!isNullOrUndefined(workInProgress));

  // root complete 
}