import { HOST_COMPONENT, HOST_ROOT, HOST_PORTAL, HOST_TEXT, FUNCTION_COMPONENT } from '../../../shared/workTags';
import { CONTENT_RESET, PLACEMENT } from '../../../shared/effectTags';
import { isNullOrUndefined, isHostParent } from '../../../shared/is';

import appendChildToContainer from '../../../renderer/config/appendChildToContainer';

function getHostParentFiber (fiber) {
  let returnFiber = fiber.return;

  while (!isNullOrUndefined(returnFiber)) {
    if (isHostParent(returnFiber)) {
      return returnFiber;
    }

    returnFiber = returnFiber.return;
  }
}

function getHostSibling(
  fiber
) {
  const node = fiber;
  siblings: while (true) {
    while (isNullOrUndefined(node.sibling)) {
      if (isNullOrUndefined(node.return) === null || isHostParent(node.return)) {
        return null;
      }

      node = node.return;
    }

    node.sibling.return = node.return;
    node = node.sibling;

    while (node.tag !== HOST_COMPONENT && node.tag !== HOST_TEXT) {
      if (node.effectTag & PLACEMENT) {
        continue siblings;
      }
      
      if (isNullOrUndefined(node.child) || node.tag === HOST_PORTAL) {
        continue siblings;
      } else {
        node.child.return = node;
        node = node.child;
      }
    }

    if (!(node.effectTag & PLACEMENT)) {
      return node.stateNode;
    }
  }
}

export default function commitPlacement (
  finishedWork
) {
  const parentFiber = getHostParentFiber(finishedWork);
  const { tag, stateNode } = parentFiber;

  let parent;
  let isContainer;

  switch (tag) {
    case HOST_COMPONENT: {
      parent = stateNode;
      isContainer = false;
      break;
    }
    case HOST_ROOT: {
      parent = stateNode.containerInfo;
      isContainer = true;
      break;
    }

    case HOST_PORTAL: {
      parent = stateNode.containerInfo;
      isContainer = true;
      break;
    }
    default:
      console.log('Invalid host parent')
  }

  if (parentFiber.effectTag & CONTENT_RESET) {
    resetTextContent(parent);
    parentFiber.effectTag &= ~CONTENT_RESET;
  }

  const before = getHostSibling(finishedWork);
  let node = finishedWork;
  while (true) {
    const isHost = node.tag === HOST_COMPONENT || node.tag === HOST_TEXT;

    if (isHost || node.tag === FUNCTION_COMPONENT) {
      const stateNode = isHost ? 
        node.stateNode : 
        node.stateNode.instance;

      if (before) {
        if (isContainer) {
          insertInContainerBefore(parent, stateNode, before);
        } else {
          insertBefore(parent, stateNode, before);
        }
      } else {
        if (isContainer) {
          appendChildToContainer(parent, stateNode);
        } else {
          appendChild(parent, stateNode);
        }
      }
    } else if (node.tag === HOST_PORTAL) {

    } else if (!isNullOrUndefined(node.child)) {
      node.child.return = node;
      node = node.child;
      continue;
    }

    if (node === finishedWork) {
      return;
    }

    while (isNullOrUndefined(node.sibling)) {
      if (isNullOrUndefined(node.return) || node.return === finishedWork) {
        return;
      }

      node = node.return;
    }

    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function safelyDetachRef(current) {
  const ref = current.ref;
  if (ref.current !== null) {

  } else {
    ref.current = null;
  }

}
