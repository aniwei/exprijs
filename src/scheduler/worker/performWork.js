
import workLoop from './workLoop';
import worker from './index';
import { isNull } from '../../shared/is';
import completeRoot from './completeRoot';

export default function performWork (
  deadline, 
  root,
) {
  workLoop(deadline, root);

  if (worker.nextUnitOfWork) {

  }

  if (isNull(worker.nextUnitOfWork)) {
    worker.finishedWork = root.current.alternate;

    if (worker.finishedWork) {
      completeRoot(root, worker.finishedWork);
    }
  }
}