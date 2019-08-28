import requestIdleCallback from 'requestidlecallback';

import { HOST_ROOT } from '../shared/workTags';
import performWork from './performWork';
import resetWork from './resetWork';

function getHostRootFromFiber (fiber) {
  while (fiber) {
    if (fiber.tag === HOST_ROOT) {
      return fiber;
    }

    fiber = fiber.return;
  }
}

export default function scheduleWork (fiber) {
  const root = getHostRootFromFiber(fiber);

  resetWork();
  requestIdleCallback(dl => performWork(dl, root));
}