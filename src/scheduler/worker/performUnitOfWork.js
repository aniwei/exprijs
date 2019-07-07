import beginWork from './beginWork';
import completeWork from './completeWork';

export default function performUnitOfWork (workInProgress) {
  beginWork(workInProgress);

  if (workInProgress.child) {
    return workInProgress.child;
  }

  let sibling = wipFiber;
  while (sibling) {
    completeWork(sibling);
    if (sibling.sibling) {
      return sibling.sibling;
    }
    sibling = sibling.parent;
  }
};