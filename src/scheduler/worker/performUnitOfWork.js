import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";

export const performUnitOfWork = workInProgress => {
  beginWork(workInProgress);

  if (wipFiber.child) {
    return wipFiber.child;
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