import { HostRoot } from './workTags';

const NoWork = 0;

class FiberNode {
  constructor (tag, pendingProps, key, mode) {
    this.tag = tag;
    this.key = key;
    this.type = null;

    this.stateNode = null;

    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.memoizedState = null;
    
    // update queue
    this.queue = null;

    this.mode = mode;

    // effects
    this.effectTag = null;
    this.nextEffect = null;
    this.firstEffect = null;
    this.lastEffect = null;

    this.expirationTime = NoWork;
    this.childExpirationTime = NoWork;

    this.alternate = null;
  }
}

export function createFiber (vnode) {
  return new FiberNode();
}