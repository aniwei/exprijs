import ReactRoot from './ReactRoot';
import { unbatchedUpdates } from '../reconciler';

export function legacyRenderSubtreeIntoContainer (
  parentComponent, 
  element, 
  container, 
  callback
) {
  const root = getReactRootContainer(container);

  root.render(element, callback);

  return getPublicRootInstance(root._internalRoot);
}

function getReactRootContainer (container, callback) {
  const { _reactRootContainer: root } = container;

  if (root) {
    return root;
  } else {
    const root = legacyCreateFromContainer(container);
    unbatchedUpdates(() => {

    });

    return root;
  }

  return legacyCreateFromContainer(container);
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
  
  while (sibling = container.child) {
    container.removeChild(sibling);
  }

  return new ReactRoot(container);
}
