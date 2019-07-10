import reconcileChildrenArray from '../reconciler/reconcileChildrenArray';
import { cloneChildFibers } from '../reconciler/cloneChildFibers';
import { isNull, isNullOrUndefined } from '../../shared/is';
import processUpdateQueue from './processUpdateQueue';

export default function updateClassComponent (workInProgress) {
  let instance = workInProgress.stateNode;
  if (isNull(instance)) {
    instance = workInProgress.stateNode = constructClassInstance(workInProgress);
  } else if (workInProgress.props == instance.props && !workInProgress.partialState) {
    cloneChildFibers(workInProgress);
    return;
  }

  instance.props = workInProgress.props;
  instance.state = Object.assign({}, instance.state, workInProgress.partialState);
  workInProgress.partialState = null;

  const newChildElements = instance.render();

  reconcileChildrenArray(workInProgress, newChildElements);
};

function constructClassInstance (workInProgress, props) {
  const { elementType: Component } = workInProgress;
  const instance = new Component(props);

  workInProgress.memoizedState = isNullOrUndefined(instance.state) ? 
    instance.state : null;

  workInProgress.stateNode = instance;

  return instance;
}

function mountClassComponent (workInProgress, props) {
  const { instance } = workInProgress;
    
  instance.props = props;
  instance.state = workInProgress.memoizedState;

  const updateQueue = workInProgress.updateQueue;
  
  if (!sNull(updateQueue)) {
    processUpdateQueue(workInProgress, updateQueue);
    instance.state = workInProgress.memoizedState;
  }
}