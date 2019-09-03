
import { isNull, isNullOrUndefined } from '../../shared/is';
import workLoop from './workLoop';
import workLoopSync from './workLoopSync';
import completeRoot from './completeRoot';
import requestWork from './requestWork';
import scheduler from '../index';
import worker from './index';

export default function performWork (
  deadline, 
  fiber,
  sync
) {
  worker.isWorking = true;  

  if (sync) {
    workLoopSync(fiber);

    scheduler.isRootRendering = false;
  } else {
    workLoop(deadline, fiber);

    if (worker.nextUnitOfWork) {
      requestWork(worker.nextUnitOfWork);
    }
  }

  if (isNullOrUndefined(worker.nextUnitOfWork)) {
    const root = worker.root;
    root.finishedWork = root.current.alternate;

    completeRoot(root, root.finishedWork);  
  }
}