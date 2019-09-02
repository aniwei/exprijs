
import { isNull, isNullOrUndefined } from '../../shared/is';
import workLoop from './workLoop';
import worker from './index';
import completeRoot from './completeRoot';
import requestWork from './requestWork';
import scheduler from '../index';

export default function performWork (
  deadline, 
  root,
) {
  worker.isWorking = true;  

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

  scheduler.isRendering = false;
}