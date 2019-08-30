import { isNullOrUndefined } from '../../shared/is';
import createUpdateQueue from './createUpdateQueue';

export default function enqueueUpdate (
  fiber, 
  update
) {
  debugger;
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
}