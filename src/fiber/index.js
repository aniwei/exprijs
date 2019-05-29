import { 
  NO_EFFECT,
  isNull,
  workTags
} from '../shared';
import { createWorker, scheduleWork } from './worker';

const {
  CLASS_COMPONENT,
  HOST_COMPONENT,
} = workTags;

class ReactContainer {
  constructor (root) {
    this._internalRoot = root;
  }

  onCommit () {}
  onComplete () {}

  then () {}

  commit () {}

  render (children, callback) {
    this.children = children;
    const internalRoot = this._internalRoot;

    scheduleUpdate(
      internalRoot.current,
      this.children, 
      callback
    );
  }
}


function createFiberNode (tag, pendingProps, key) {
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

function createHostRootFiber () {
  return createFiber(HOST_COMPONENT, null, null);
}

function createFiber(...argv) {
	return new createFiberNode(...argv);
}

export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  
  if (isNull(workInProgress)) {
    const { 
      tag, 
      pendingProps, 
      key, 
    } = current;

    workInProgress = createFiber(tag, pendingProps, key);

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

  fiber = createFiber(fiberTag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.expirationTime = expirationTime;

  return fiber;
}



export function createFiberFromElement(element) {
  const owner = null;
  const { type, key } = element;
  const pendingProps = element.props;

  const fiber = createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    owner
  );

  return fiber;
}

export function createFiberFromText(content) {
  const fiber = createFiber(HostText, content, null);
  
  return fiber;
}

export function createRootFiber (container) {
  const uninitializedFiber = createHostRootFiber();

  return {
    current: uninitializedFiber,
    container
  }
}

export function createContainer (container) {
  return new ReactContainer(
    createRootFiber(container)
  );
}

export function scheduleUpdate (current, element) {
  scheduleWork(current);
}