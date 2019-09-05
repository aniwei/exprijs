import { HOST_ROOT } from '../../shared/workTags';

export default function scheduleWorkToRoot (
  fiber
) {
  while (fiber) {
    if (fiber.tag === HOST_ROOT) {
      return fiber.stateNode;
    }

    fiber = fiber.return;
  }
}