import createUpdateQueue from './createUpdateQueue';
import appendUpdateToQueue from './appendUpdateToQueue';

export default function enqueueUpdate (fiber, update) {
  const queue = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
  appendUpdateToQueue(queue, update);
}