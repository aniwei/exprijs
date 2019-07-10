import worker from './index';
import workLoop from './workLoop';
import { request } from 'requestidlecallback';

export default function performWork (deadline) {

  workLoop(deadline);
  if (worker.nextUnitOfWork || worker.updateQueue.length > 0) {
    request(performWork);
  }
};
