import { requestIdleCallback, ENOUGH_TIME } from './shared';

class Worker {
  constructor () {
    this.nextUnitOfWork = null;
    this.pendingCommit = null;
    this.queue = [];
  }

  resetNextUnitOfWork () {
    const update = this.queue.shift();

    if (update) {
      if (update.partialState) {
        update.instance.__fiber.partialState = update.partialState;
      }

      const root =
        update.from == HOST_ROOT
          ? update.dom._rootContainerFiber
          : getRoot(update.instance.__fiber);

      this.nextUnitOfWork = {
        tag: HOST_ROOT,
        stateNode: update.dom || root.stateNode,
        props: update.newProps || root.props,
        alternate: root
      };
    }
  }

  performUnitOfWork (workInProgress) {
    this.beginWork(workInProgress);

    if (workInProgress.child) {
      return workInProgress.child;
    }

    let sibling = workInProgress;
    
    while (sibling) {
      this.completeWork(sibling);

      if (sibling.sibling) {
        return sibling.sibling;
      }
      
      sibling = sibling.return;
    }
  }

  completeWork (fiber) {
    if (fiber.tag == CLASS_COMPONENT) {
      fiber.stateNode.__fiber = fiber;
    }

    if (fiber.return) {
      const childEffects = fiber.effects || [];
      const thisEffect = fiber.effectTag != null ? [fiber] : [];
      const parentEffects = fiber.parent.effects || [];
      fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
    } else {
      this.pendingCommit = fiber;
    }
  }

  beginWork (workInProgress) {
    switch (workInProgress.tag) {
      case CLASS_COMPONENT: {

        break;
      }
        
      case FUNCTION_COMPONENT: {

        break;
      }
    }    
  }

  performWork = (deadline) => {
    this.workLoop(deadline);

    const length = this.queue;
    if (this.nextUnitOfWork || length > 0) {
      requestIdleCallback(this.performWork);
    }
  }

  workLoop (deadline) {
    if (!this.nextUnitOfWork) {
      this.resetNextUnitOfWork();
    }

    while (this.nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
      this.nextUnitOfWork = this.performUnitOfWork(this.nextUnitOfWork);
    }
    
    if (this.pendingCommit) {
      this.commitAllWork(this.pendingCommit);
    }
  }

  commitWork = (fiber) => {
    if (fiber.tag == HOST_ROOT) {
      return;
    }
  
    let domParentFiber = fiber.parent;
    while (domParentFiber.tag == CLASS_COMPONENT) {
      domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.stateNode;
  
    if (fiber.effectTag == PLACEMENT && fiber.tag == HOST_COMPONENT) {
      domParent.appendChild(fiber.stateNode);
    } else if (fiber.effectTag == UPDATE) {
      updateDomProps(fiber.stateNode, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag == DELETION) {
      commitDeletion(fiber, domParent);
    }
  }

  commitAllWork (fiber) {
    fiber.effects.forEach(this.commitWork);
    fiber.stateNode._rootContainerFiber = fiber;

    this.nextUnitOfWork = null;
    this.pendingCommit = null;
  }
}

export function createWorker () {
  return new Worker();
}

