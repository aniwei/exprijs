import { isNullOrUndefined } from '../shared/is';
import { createWorkProgress } from './createWorkProgress';

export default function cloneChildFibers (
  current, 
  workInProgress
) {
  if (!isNullOrUndefined(workInProgress.child)) {
    let child = workInProgress.child;
    let newChild = createWorkProgress(child, child.pendingProps);

    workInProgress.child = newChild;
    newChild.return = workInProgress;

    while (isNullOrUndefined(child.sibling)) {
      child = child.sibling;
      newChild = createWorkProgress(child, child.pendingProps);
      newChild.return = workInProgress;
    }

    newChild.sibling = null;
  }
}