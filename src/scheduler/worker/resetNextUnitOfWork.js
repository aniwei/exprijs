import { HOST_ROOT, updateQueue } from '../../shared';
import worker from './index';
import { getRootFromSchedule, createWorkInProgress } from '../index';

export default function resetNextUnitOfWork () {
  const current = getRootFromSchedule();
  const updateQueue = current.updateQueue;
  
  if (updateQueue) {
    worker.nextUnitOfWork = createWorkInProgress(current, null);
  }
};
