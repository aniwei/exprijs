import { isNull } from '../shared/is';
import { NO_EFFECT } from '../shared';
import { HOST_ROOT } from '../shared/workTags';


export function createWorkInProgress (
  current, 
  pendingProps
) {
  let { alternate: workInProgress } = current;
  
  if (isNull(workInProgress)) {
    const { 
      tag, 
      pendingProps, 
      key, 
    } = current;

    workInProgress = createFiber(
      tag, 
      pendingProps, 
      key
    );

    const { 
      elementType, 
      type, 
      stateNode
    } = current;
    
    workInProgress.elementType = elementType;
    workInProgress.type = type;
    workInProgress.stateNode = stateNode;
    
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.effectTag = NO_EFFECT;
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  const { 
    child, 
    memoizedProps, 
    memoizedState, 
    queue, 
    sibling,
    index,
    ref,
    contextDependencies 
  } = current;

  workInProgress.child = child;
  workInProgress.memoizedProps = memoizedProps;
  workInProgress.memoizedState = memoizedState;
  workInProgress.queue = queue;
  workInProgress.contextDependencies = contextDependencies;
  workInProgress.sibling = sibling;
  workInProgress.index = index;
  workInProgress.ref = ref;

  return workInProgress;
}

export function createHostRootFiber () {
  return createFiber(HOST_ROOT, null, null);
}

function createFiber(
  tag, 
  pendingProps, 
  key
) {
	return new createFiberNode(tag, pendingProps, key);
}

function createFiberNode (
  tag, 
  pendingProps, 
  key
) {
  return {
    tag,
    key,
    elementType: null,
    type: null,
    stateNode: null,

    return: null,
    child: null,
    sibling: null,
    index: 0,
    
    ref: null,
    pendingProps,
    memoizedProps: null,
    memoizedState: null,
    queue: null,
    contextDependencies: null,

    effectTag: NO_EFFECT,
    nextEffect: null,
    firstEffect: null,
    lastEffect: null,

    alternate: null 
  }
}