import createContainer from '../reconciler/createContainer';
import updateContainer from '../reconciler/updateContainer';

import ReactCurrentRootInstance from '../react/ReactCurrentRootInstance';

class ReactRoot {
  constructor (container) {
    this._internalRoot = createContainer(container);
  }

  render (element, callback) {
    updateContainer(element, this._internalRoot, callback);
  }
}

export default function renderIntoContainer (
  parentComponent, 
  element,
  container,
  callback
) {
  const root = container._reactRootContainer || (
    container._reactRootContainer = new ReactRoot(container)
  );

  ReactCurrentRootInstance.current = container;

  return root.render(element, callback);
}