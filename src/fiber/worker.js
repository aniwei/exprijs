import { requestIdleCallback, ENOUGH_TIME } from './shared';
import { workTag } from './shared';
import { updateClassComponent, updateHostComponent } from '../lifecycle';
import { isNull, NO_EFFECT } from '../shared';
import { createRootFiber, createWorkInProgress } from '.';

const { CLASS_COMPONENT } = workTag;

class Worker {
  constructor () {
    this.nextUnitOfWork = createWorkInProgress(this.rootFiber.current, null);
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

  getNextUnitOfWork (workInProgress) {

  }

  completeUnitOfWork (workInProgress) {
    while (true) {
      const { 
        alternate: current ,
        return: returnFiber,
        siblingFiber: sibling,
      } = workInProgress;

      if (workInProgress.effectTag & Incomplete) {
        
        this.nextUnitOfWork = workInProgress;
        this.nextUnitOfWork = this.completeWork(current, workInProgress);

        if (!isNull(this.nextUnitOfWork)) {
          return this.nextUnitOfWork;
        }

        if (
          !isNull(returnFiber) &&
          (returnFiber.effectTag & Incomplete) === NO_EFFECT
        ) {
          const { firstEffect, lastEffect } = returnFiber;

          if (isNull(firstEffect)) {
            returnFiber.firstEffect = workInProgress.firstEffect
          }

          if (!isNull(workInProgress.lastEffect)) {
            if (!isNull(lastEffect)) {
              returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
            }

            returnFiber.lastEffect = workInProgress.lastEffect;
          }

          const { effectTag } = workInProgress;

          if (effectTag > PerformedWork) {

          }

          if (!isNull(siblingFiber)) {
            return siblingFiber;
          } else if (!isNull(returnFiber)) {
            workInProgress = returnFiber;
            continue;
          } else {
            return null;
          }
          
        }
      }
    }
  }

  
  completeWork (current, workInProgress) {
    const { tag, pendingProps: nextProps } = workInProgress;

    switch (tag) {
      case CLASS_COMPONENT: {
        break;
      }

      case HOST_COMPONENT: {
        const { type, stateNode } = workInProgress;

        if (!isNull(current) && !isNull(stateNode)) {

        } else {
          if (nextProps) {
            const instance = createInstance();

            workInProgress.stateNode = instance;
          }
        }

        break;
      }
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
        const Component = workInProgress.type;
        const pendingProps = workInProgress.pendingProps;
        const resolvedProps = Component ? 
          pendingProps : this.resolveDefaultProps(Component, pendingProps);
        
        return updateClassComponent(current, workInProgress, Component, resolvedProps);
      }

      case HOST_COMPONENT: {
        return updateHostComponent(current, workInProgress);
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
  
  performUnitOfWork (workInProgress) {
    const current = workInProgress.alternate;
    let next = this.beginWork(current, workInProgress);
    workInProgress.memoizedProps = workInProgress.pendingProps;

    if (next === null) {
      next = this.completeUnitOfWork();
    } 

    return next;
  }

  workLoop () {
    while (this.nextUnitOfWork !== null) {
      this.nextUnitOfWork = this.performUnitOfWork(this.nextUnitOfWork);
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

export function createWorker (type, container, callback) {
  return new Worker(type, container, callback);
}

export function scheduleWork (type, container, callback) {
  const root = createRootFiber();
  const nextUnitOfWork = createWorkInProgress(root.current, null);
  const worker = createWorker();

  worker.nextUnitOfWork = nextUnitOfWork;
  worker.performWork();

  return root;
}