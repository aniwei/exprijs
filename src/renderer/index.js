
export function legacyRenderSubtreeIntoContainer (
  parentComponent, 
  element, 
  container, 
  callback
) {
  const root = container.__reactRootContainer || (
    container.__reactRootContainer = createReactRootContainer(container)
  );

  return root;
}

function createReactRootContainer (container) {
  return new ReactRoot(container);
}