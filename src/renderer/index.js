import ReactRoot from './ReactRoot';
import { unbatchedUpdates } from '../scheduler/reconciler';

export function legacyRenderIntoContainer (
  parentComponent, 
  element, 
  container, 
  callback
) {
  const root = container._reactRootContainer || legacyCreateFromContainer();

  

  return getPublicRootInstance(root._internalRoot);
}

function getPublicRootInstance (container) {
  const containerFiber = container.current;

  if (!containerFiber.child) {
    return null;
  }

  switch (containerFiber.child.tag) { 
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode); 
    default:
      return containerFiber.child.stateNode;
  }
}


function legacyCreateFromContainer (container) {
  let sibling;
  
  // clear children
  while (sibling = container.child) {
    container.removeChild(sibling);
  }

  return new ReactRoot(container);
}
