import { isNullOrUndefined } from '../../shared/is';
import createUpdateQueue from './createUpdateQueue';
import appendUpdateToQueue from './appendUpdateToQueue';

export default function enqueueUpdate (
  fiber, 
  update
) {
  const alternate = fiber.alternate;

  let firstQueue;
  let secondQueue;

  if (isNullOrUndefined(alternate)) {
    firstQueue = fiber.updateQueue;
    secondQueue = null;

    if (isNullOrUndefined(firstQueue)) {
      firstQueue = createUpdateQueue(fiber.memoizedState);
      fiber.updateQueue = firstQueue;
    }
  } else {
    firstQueue = fiber.updateQueue;
    secondQueue = alternate.updateQueue;
  }

  if (
    isNullOrUndefined(secondQueue) || 
    firstQueue === secondQueue
  ) {
    appendUpdateToQueue(firstQueue, update);
  } else {
    if (isNullOrUndefined(firstQueue.lastUpdate) || isNullOrUndefined(secondQueue.lastUpdate)) {
      appendUpdateToQueue(firstQueue, update);
      appendUpdateToQueue(secondQueue, update);
    } else {
      appendUpdateToQueue(firstQueue, update);
      secondQueue.lastUpdate = update;
    }
  }
}