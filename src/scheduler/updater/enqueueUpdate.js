import { isNull } from '../../shared/is';
import createUpdateQueue from './createUpdateQueue';
import appendUpdateToQueue from './appendUpdateToQueue';

export default function enqueueUpdate (
  fiber, 
  update
) {
  const { alternate } = fiber;
  let firstQueue;
  let secondQueue;

  if (isNull(alternate)) {
    firstQueue = fiber.updateQueue || 
      (fiber.updateQueue = createUpdateQueue(fiber.memoizedState));
      
    secondQueue = null;
  } else {
    firstQueue = fiber.updateQueue;
    secondQueue = alternate.updateQueue;

    if (isNull(firstQueue)) {
      if (isNull(secondQueue)) {
        firstQueue = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        secondQueue = alternate.updateQueue = createUpdateQueue(
          alternate.memoizedState,
        );
      } else {
        firstQueue = fiber.updateQueue = cloneUpdateQueue(secondQueue);
      }
    } else {
      if (isNull(secondQueue)) {
        secondQueue = alternate.updateQueue = cloneUpdateQueue(firstQueue);
      }
    }
  }

  if (isNull(secondQueue) || firstQueue === secondQueue) {
    appendUpdateToQueue(firstQueue, update);
  } else {
    if (isNull(firstQueue.lastUpdate) || isNull(secondQueue.lastUpdate)) {
      appendUpdateToQueue(firstQueue, update);
      appendUpdateToQueue(secondQueue, update);
    } else {
      appendUpdateToQueue(firstQueue, update);
      secondQueue.lastUpdate = update;
    }
  }
}