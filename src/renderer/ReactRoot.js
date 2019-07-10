import { createHostRootFiber } from '../scheduler';
import scheduleRootUpdate from '../scheduler/scheduleRootUpdate';

function updateContainer (
  element, 
  root,
  parentComponent,
  callback
) {
  const { current } = root;

  return scheduleRootUpdate(current, element, callback);
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
    this._internalRoot = createFiberRoot(container);
  }

  render (element, parentComponent, callback) {
    updateContainer(
      element, 
      this._internalRoot, 
      parentComponent, 
      callback
    );
  }
}