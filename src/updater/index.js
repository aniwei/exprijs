export function createUpdate () {
  return {
    // tag: UpdateState,
    payload: null,
    callback: null,
    next: null,
    
    nextEffect: null
  };
}

export function enqueueUpdate (
  current, 
  update
) {

}