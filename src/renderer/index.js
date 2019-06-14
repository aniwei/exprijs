import { unbatchedUpdates } from '../reconciler';

export function legacyRenderSubtreeIntoContainer (
  parentComponent, 
  element, 
  container, 
  callback
) {
  const root = container._reactRootContainer ? 
    root.render(element, callback) :
    unbatchedUpdates(() => {
      const root = container._reactRootContainer = legacyCreateFromContainer(container);
      root.render();  

      return root;
    });

  return getPublicRootInstance(root._reactRootContainer);
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
