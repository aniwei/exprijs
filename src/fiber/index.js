import { 
  CLASS_COMPONENT,
  HOST_COMPONENT,

  NO_EFFECT,
  isNull,
} from '../shared';

export function createFiberNode (tag, pendingProps, key, mode) {
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

    mode,
    effectTag: NO_EFFECT,
    nextEffect: null,
    firstEffect: null,
    lastEffect: null,

    alternate: null
  }
}

export function createFiber(...argv) {
	return new createFiberNode(...argv);
}

export function createHostRootFiber() {
	return createFiber(HostRoot, null, null);
}

export function createWorkInProgress(current, pendingProps) {
  const workInProgress = current.alternate;
  
  if (isNull(workInProgress)) {
    const { 
      tag, 
      pendingProps, 
      key, 
      mode 
    } = current;

    workInProgress = createFiber(tag, pendingProps, key, mode);

    const { 
      elementType, 
      type, 
      stateNode
    } = current;
    
    workInProgress.elementType = elementType;
    workInProgress.type = type
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

export function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  expirationTime,
) {
  let fiber;
  let fiberTag =  IndeterminateComponent;
  const resolvedType = type
  if (typeof type === 'function') {
    if (shouldConstruct(type)) {
      fiberTag = ClassComponent
    }
  } else if (typeof type === 'string') {
    fiberTag = HostComponent;
  } else {
    getTag: switch(type) {
      // TODO
      case REACT_MEMO_TYPE:
        fiberTag = MemoComponent;
        break getTag;
      case REACT_FORWARD_REF_TYPE:
        fiberTag = ForwardRef;
        break getTag;
    }
  }

  fiber = createFiber(fiberTag, pendingProps, key, mode);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.expirationTime = expirationTime;

  return fiber;
}

export function createFiberFromElement(element, mode, expirationTime) {
  const owner = null;
  const { type, key } = element;
  const pendingProps = element.props;

  const fiber = createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    owner,
    mode,
    expirationTime,
  )

  return fiber;
}

export function createFiberFromText(content, mode, expirationTime) {
  const fiber = createFiber(HostText, content, null, mode);
  fiber.expirationTime = expirationTime;

  return fiber;
}

export function createHostRootFiber () {
  return createFiber(HOST_COMPONENT, null, null);
}

export function createRootFiber () {
  const uninitializedFiber = createHostRootFiber();

  return {
    current: uninitializedFiber
  }
}