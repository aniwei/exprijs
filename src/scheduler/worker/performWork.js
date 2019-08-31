
import { isNull, isNullOrUndefined } from '../../shared/is';
import workLoop from './workLoop';
import worker from './index';
import completeRoot from './completeRoot';
import requestWork from './requestWork';

export default function performWork (
  deadline, 
  root,
) {
  workLoop(deadline, root);

  if (worker.nextUnitOfWork) {
    requestWork(root);
  }

  if (isNullOrUndefined(worker.nextUnitOfWork)) {
    worker.finishedWork = root.current.alternate;

    if (worker.finishedWork) {
      completeRoot(root, worker.finishedWork);  
    }
  }
}