import { createHostRootFiber } from './fiber';
import { schedulRootUpdate } from '../scheduler';

function updateContainer (
  element, 
  root,
  parentComponent,
  callback
) {
  const { current } = root;

  return schedulRootUpdate(current, element, parentComponent, callback);
}

function createContainer (container) {
  return createFiberRoot(container);
}

function createFiberRoot (container) {
  const uninitializedFiber = createHostRootFiber();
  const root = {
    current: uninitializedFiber,
    container
  };

  uninitializedFiber.stateNode = root;

  return root;
}

export default class ReactRoot {
  constructor (container) {
    this._internalRoot = createContainer(container);
  }

  render (element, parentComponent, callback) {
    updateContainer(element, this._internalRoot, parentComponent, callback);
  }
}