export default function cloneUpdateQueue (
  queue
) {
  return {
    baseState: queue.baseState,
    firstUpdate: queue.firstUpdate,
    lastUpdate: queue.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
}