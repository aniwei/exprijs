import { HOST_ROOT } from '../../shared/workTags';
import scheduleWorkToRoot from './scheduleWorkToRoot';
import requestWork from './requestWork';
import resetWork from './resetWork';
import worker from './index';
import scheduler from '../index';

export default function scheduleWork (
  fiber
) {
  const root = scheduleWorkToRoot(fiber);
  resetWork(root);

  if (
    !worker.isWorking ||
    worker.isCommitting
  ) {
    worker.isWorking = true;
    requestWork(root.current);
  }
}