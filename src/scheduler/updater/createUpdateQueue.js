export default function createUpdateQueue (baseState) {

  const queue = {
    baseState, 
    firstUpdate: null,  
    lastUpdate: null, 
    firstCapturedUpdate: null, 
    lastCapturedUpdate: null, 
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null,
  };

  return queue;
}