import { HOST_ROOT } from '../../shared/workTags';
import requestWork from './requestWork';
import resetWork from './resetWork';
import worker from './index';

function scheduleWorkToRoot (fiber) {
  while (fiber) {
    if (fiber.tag === HOST_ROOT) {
      return fiber;
    }

    fiber = fiber.return;
  }
}

export default function scheduleWork (fiber) {
  const root = scheduleWorkToRoot(fiber);

  resetWork();
  
  if (
    !worker.isWorking ||
    worker.isCommitting
  ) {
    requestWork(root);
  }
}