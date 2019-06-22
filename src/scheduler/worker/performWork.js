import { isNull } from '../shared/is';
import worker from './index';
import ReactCurrentOwner from '../../react/owner';
import { createWorkInProgress } from '../../renderer/fiber';
import workLoop from './workLoop';
import completeUnitOfWork from './completeUnitOfWork';
import renderRoot from './renderRoot';
import completeRoot from './completeRoot';


export function performSyncWork () {

}


function performWork (dl) {
  // to do => findHighestPriorityRoot
  const deadline = worker.deadline = dl;

  if (!isNull(deadline)) {
    while (next) {
      performWorkOnRoot(root);
    }
  } else {
    while (next) {
      performWorkOnRoot();
    }
  }

  if (!isNull(deadline)) {

  }

  worker.dealine = null;
}

function performWorkOnRoot (root) {
  worker.isRendering = true;

  if (isNull(deadline)) {
    let { finishedWork } = root;

    renderRoot(root);

    finishedWork = root.finishedWork;

    if (!isNull(finishedWork)) {
      completeRoot(root, finishedWork);
    }
  } else {
    let { finishedWork } = root;

    if (!isNull(finishedWork)) {
      completeRoot(root, finishedWork);
    } else {
      root.finishedWork = null;

      renderRoot(root);
      finishedWork = root.finishedWork;

      if (!isNull(finishedWork)) {
        if (shouldYield()) {
          completeRoot(root, finishedWork);
        } else {
          root.finishedWork = finishedWork;
        }
      }
    }
  }

  worker.isRendering = false;
}
