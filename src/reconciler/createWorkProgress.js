import { isNull, isNullOrUndefined, isFunction, isComponentConstructor, isString } from '../shared/is';
import { HOST_ROOT, CLASS_COMPONENT } from '../shared/workTags';


export function createWorkProgress (
  current,
  pendingProps
) {
  let { alternate: workInProgress } = current;

  if (isNullOrUndefined(workInProgress)) {
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
    updateQueue, 
    sibling,
    index,
    ref,
    contextDependencies 
  } = current;

  workInProgress.child = child;
  workInProgress.memoizedProps = memoizedProps;
  workInProgress.memoizedState = memoizedState;
  workInProgress.updateQueue = updateQueue;
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

export function createFiberFromElement (
  element
) {
  const owner = null;
  owner = element._owner;

  const type = element.type;
  const key = element.key;

  const pendingProps = element.props;
  const fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner);

  return fiber;
}

export function createFiberFromTypeAndProps (
  type, 
  key, 
  pendingProps, 
  owner
) {
  let tag = IN_COMPONENT;
  // let resolvedType = type;
  if (isFunction(type)) {
    if (isComponentConstructor(type)) {
      tag = CLASS_COMPONENT;
      // resolvedType = 
    }
  } else if (isString(type)) {
    tag = HOST_COMPONENT;
  } else {

  }

  const fiber = createFiber(tag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = type;

  return fiber;
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