
import { EMPTY_OBJECT, isFunction, isObject, isNullOrUndefined, isNull } from '../shared';
import { reconcileChildren } from './reconciler';
import { invalidateContextProvider } from './context';

function processUpdate () {

}

function constructClassInstance (workInProgress, Constructor, props) {
  const contextTypes = constroctor.contextTypes;
  let unmaskedContext = {};
  let context = null;

  const instance = new Constructor(props, context);
  instance.state = workInProgress.memoizedState;
  instance.updater = classComponentUpdater;
  instance._reactInternalFiber = workInProgress;
  instance._reactInternalInstance = fakeInternalInstance;

  workInProgress.stateNode = instance;

  return instance;
}
function mountClassInstance (workInProgress, Constructor, props) {
  const instance = workInProgress.stateNode;
  instance.props = workInProgress.props;
  instance.state = workInProgress.memoizedState;
  instance.refs = EMPTY_OBJECT;

  const queue = workInProgress.queue;

  if (queue !== null) {
    processUpdate();
  }

  const getDerivedStateFromProps = Constructor.getDerivedStateFromProps;

  // lifecycle getDervivedStateFromProps
  if (isFunction(getDerivedStateFromProps)) {
    applyDerivedStateFromProps(
      workInProgress, 
      Constructor, 
      getDerivedStateFromProps
    );

    instance.state = workInProgress.memoizedState;
  }

  if (
    !isFunction(Constructor.getDerivedStateFromProps)
  ) {
    callComponentWillMount(workInProgress, instance);

    queue = workInProgress.queue;

    if (queue !== null) {
      processUpdate(workInProgress, queue);
      instance.state = workInProgress.memoizedState;
    }
  }

  if (isFunction(instance.componentDidMount)) {
    workInProgress.effectTag |= Update;
  }

}



function updateClassInstance () {}


function finishClassComponent (current, workInProgress, Constructor, shouldUpdate, hasContext) {
  const instance = workInProgress;

  ReactCurrentOwner,current = workInProgress;
  
  const children = instance.render();
  workInProgress.effectTag |= PerformedWork;


  reconcileChildren(current, workInProgress, children);

  workInProgress.memoizedState = instance;
  
  if (hasContext) {
    invalidateContextProvider(workInProgress, Constructor, true)
  }

  return workInProgress.child;
}

function mountChildFiber (returnFiber, currentFirstChild, child) {
  const isObj = isObject(child) && isNull(child);

  if (isObj) {
    switch (child.$$typeof) {
      case REACT_ELEMENT_TYPE:
        return replaceSingleChild();

      case REACT_PORTAL_TYPE:
        return placeSingleChild()
    }
  }


}

function applyDerivedStateFromProps () {

}

function callComponentWillMount (workInProgress, instance) {

}


export function updateHostComponent (current, workInProgress) {
  if (isNull(current)) {

  }

  const { type, pendingProps: nextProps } = workInProgress;
  const prevProps = isNull(current) ? current.memoizedProps : null;
  const children = nextProps.children;
  
  reconcileChildren(current, workInProgress, children);
  return workInProgress.child;
}

export function updateClassComponent (current, workInProgress, Component, nextProps) {
  let hasContext;
  let shouldUpdate;

  const instance = workInProgress.stateNode;


  if (isNullOrUndefined(instance)) {
    if (!isNullOrUndefined(current)) {
      constructClassInstance(
        workInProgress, 
        Component,
        nextProps
      );

      mountClassInstance(
        workInProgress,
        Component,
        nextProps,
      );

      shouldUpdate = true;
    }
  } else if (isNullOrUndefined(current)) {
    shouldUpdate = resumeMountClassInstance(current, workInProgress)
  } else {
    shouldUpdate = updateClassInstance(
      current,
      workInProgress
    );
  }

  const nextUnitOfWork = finishClassComponent(
    current,
    workInProgress,
    Constructor,
    shouldUpdate,
    hasContext
  );

  return nextUnitOfWork
}