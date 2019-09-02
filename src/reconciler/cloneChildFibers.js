import { isNullOrUndefined } from '../shared/is';
import { createWorkInProgress } from './FiberNode';

export default function cloneChildFibers (
  current, 
  workInProgress
) {
  if (!isNullOrUndefined(workInProgress.child)) {
    let child = workInProgress.child;
    let newChild = createWorkInProgress(child, child.pendingProps);

    workInProgress.child = newChild;
    newChild.return = workInProgress;

    while (!isNullOrUndefined(child.sibling)) {
      child = child.sibling;
      newChild = createWorkInProgress(child, child.pendingProps);
      newChild.return = workInProgress;
    }

    newChild.sibling = null;
  }
}