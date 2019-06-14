import { isNull, isNullOrUndefined } from '../shared/is';
import classComponentUpdater from '../updater/classComponentUpdater';


export default class ClassComponent {
  constructor (
    current,
    workInProgress,
    nextProps
  ) {
    this.current = current;
    this.workInProgress = workInProgress;
    this.nextProps = nextProps;
    this.instance = null;
    
    isNull(this.current) ?
      this.construct().mount() : this.update(); 
  }

  construct () {
    const { workInProgress } = this;
    const { elementType: Component } = workInProgress;
    const instance = new Component(this.nextProps);

    workInProgress.memoizedState = isNullOrUndefined(instance.state) ? 
      instance.state : null;

    this.instance = instance;

    this.adopt();
    
    return this;
  }

  adopt () {}
  mount () {
    const { workInProgress, instance } = this;
    
    instance.props = this.nextProps;
    instance.state = workInProgress.memoizedState;

    const updateQueue = workInProgress.updateQueue;
    
    if (!sNull(updateQueue)) {
      processUpdateQueue(workInProgress, updateQueue);
      instance.state = workInProgress.memoizedState;
    }
  }

  update () {}

  finish () {}
}


function mountClassInstance (
  workInProgress,
  Component,
  nextProps
) {
  const instance = workInProgress.stateNode;
  instance.props = nextProps;
  instance.state = workInProgress.memoizedState;

  const updateQueue = workInProgress.updateQueue;
  if (!sNull(updateQueue)) {
    processUpdateQueue(workInProgress, updateQueue);
    instance.state = workInProgress.memoizedState;
  }
}

function constructClassInstance (
  workInProgress,
  Component,
  nextProps
) {
  const instance =  new Component(props);

  workInProgress.memoizedState = isNullOrUndefined(instance.state) ? instance.state : null;

  adoptClassInstance(workInProgress, instance);
  return instance;
}

function adoptClassInstance (
  workInProgress,
  instance
) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  
  set(instance, workInProgress);
}

function finishClassComponent (
  current, 
  workInProgress, 
  shouldUpdate, 
) {
  if (!shouldUpdate) {
    cloneChildFibers(workInProgress)
  } else {
    const instance = workInProgress.stateNode;
    const nextChildren = instance.render();

    reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)
    memoizeState(workInProgress, instance.state)
    memoizeProps(workInProgress, instance.props)
  }

  return workInProgress.child;
}