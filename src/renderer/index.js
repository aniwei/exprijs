import createContainer from '../reconciler/createContainer';
import updateContainer from '../reconciler/updateContainer';

class ReactRoot {
  constructor (container) {
    this._root = createContainer(container);
  }

  render (element) {
    updateContainer(element, this._root);
  }
}

export default function render (element, container, callback) {
  const root = container._reactRootContainer || (
    container._reactRootContainer = new ReactRoot(container)
  );

  return root.render(element);
}