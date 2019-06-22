export default function cloneUpdateQueue (updateQueue) {
  const { 
    state,
    firstUpdate,
    lastUpdate,
    
  } = updateQueue;

  return {
    state
    firstUpdate,
    lastUpdate,

    firstCapturedUpdate: null,
    lastCapturedUpdate: null,

    firstEffect: null,
    lastEffect: null,

    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
}