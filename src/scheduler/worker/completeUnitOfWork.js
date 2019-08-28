import { 
  NO_EFFECT,
  INCOMPLETE, 
  PERFORMED_WORK
} from '../../shared/effectTags';

import completeWork from './completeWork';
import { isNull } from '../../shared/is';

export default function completeUnitOfWork (workInProgress) {
  while (true) {
    const current = workInProgress.alternate;
    const returnFiber = workInProgress.return;
    const siblingFiber = workInProgress.sibling;

    const effectTag = workInProgress.effectTag;

    if (effectTag & INCOMPLETE === NO_EFFECT) {
      let next = completeWork(current, workInProgress);
      
      if (
        !isNull(returnFiber) &&
        (returnFiber.effectTag & INCOMPLETE === NO_EFFECT)
      ) {
        if (effectTag > PERFORMED_WORK) {
          returnFiber
        }
      }
  
      if (!isNull(siblingFiber)) {
        return siblingFiber;
      } else if (!isNull(returnFiber)) {
        workInProgress = returnFiber;
      } else {
        break;
      }
    } else {
      if (!isNull(siblingFiber)) {
        return siblingFiber;
      } else if (!isNull(returnFiber)) {
        workInProgress = returnFiber;
      } else {
        break;
      }
    }
  }
}