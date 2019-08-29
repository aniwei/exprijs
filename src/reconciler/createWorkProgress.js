import { isNull } from '../shared/is';
import { HOST_ROOT } from '../shared/workTags';


export function createWorkProgress (
  current,
  pendingProps
) {
  let { alternate: workInProgress } = current;

  if (isNull(workInProgress)) {
    const { 
      tag,
      pendingProps,
      key,

      type,
      elementType,
      stateNode
    } = current;

    workInProgress = createFiber(tag, pendingProps, key);
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

export function createFiberRoot (
  container,

) {
  const uninitializedFiber = createFiber(HOST_ROOT, null, null);

  const root = {
    containerInfo: container,
    current: uninitializedFiber,
    didError: false,
    finishedWork: null,
  }

  uninitializedFiber.stateNode = root;

  return root;
}

export function createFiber (
  tag,
  pendingProps,
  key
) {
  return new createFiberNode(tag, pendingProps, key);
}

export function createFiberNode (
  tag,
  pendingProps,
  key
) {
  return {
    tag,
    key,
    type: null,
    elementType: null,
    stateNode: null,

    return: null,
    child: null,
    sibling: null,
    index: 0,
    
    ref: null,
    pendingProps: null,
    memoizedProps: null,
    memoizedState: null,
  }
}