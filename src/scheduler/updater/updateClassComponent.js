import { resolveDefaultProps, EMPTY_OBJECT } from '../../shared';
import { isNull, isFunction, isNullOrUndefined } from '../../shared/is';
import { PLACEMENT, UPDATE, PERFORMED_WORK, NO_EFFECT, DID_CAPTURE } from '../../shared/effectTags';
import classComponentUpdater from './classComponentUpdater';
import processUpdateQueue from './processUpdateQueue';
import reconcileChildren from '../../reconciler/reconcileChildren';
import ReactCurrentOwner from '../../react/ReactCurrentOwner';

function constructClassInstance (
  workInProgress,
  Component,
  props
) {
  let context = null;

  const instance = new Component(props, context);

  if (isNullOrUndefined(instance.state)) {
    workInProgress.memoizedState = null;
  } else {
    workInProgress.memoizedState = instance.state;
  }

  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  instance._reactInternalInstance = workInProgress;

  return instance;
}

function mountClassInstance(
  workInProgress,
  Component,
  props,
) {
  const instance = workInProgress.stateNode;
  
  const hasContext = false;
  instance.props = props;

  instance.state = workInProgress.memoizedState;
  instance.refs = EMPTY_OBJECT;

  // context
  let updateQueue = workInProgress.updateQueue;

  if (!isNullOrUndefined(updateQueue)) {
    processUpdateQueue(workInProgress, updateQueue, props, instance);

    instance.state = workInProgress.memoizedState;
  }

  const getDerivedStateFromProps = Component.getDerivedStateFromProps;
  const isDerivedStateFunction = isFunction(getDerivedStateFromProps);

  if (isDerivedStateFunction) {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props);

    instance.state = workInProgress.memoizedState;
  }

  const {
    getSnapshotBeforeUpdate,
    UNSAFE_componentWillMount,
    componentWillMount,
    componentDidMount
  } = instance;

  if (
    isDerivedStateFunction &&
    !isFunction(getSnapshotBeforeUpdate) &&
    (
      isFunction(UNSAFE_componentWillMount) ||
      isFunction(componentWillMount)
    )
  ) {
    callComponentWillMount(workInProgress, instance);

    updateQueue = workInProgress.updateQueue;
    if (!isNull(updateQueue)) {
      processUpdateQueue(
        workInProgress,
        updateQueue,
        props,
        instance
      );
      instance.state = workInProgress.memoizedState;
    }
  }

  if (isFunction(componentDidMount)) {
    workInProgress.effectTag |= UPDATE;
  }
}

function updateClassInstance (
  current,
  workInProgress,
) { 

}

function finishClassComponent (
  current,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext
) {

  const instance = workInProgress.stateNode;
  const didCaptureError = workInProgress.effectTag  & DID_CAPTURE === NO_EFFECT;

  ReactCurrentOwner.current = workInProgress;
  workInProgress.effectTag |= PERFORMED_WORK;

  let nextChildren;

  if (didCaptureError && !isFunction(Component.getDerivedStateFromError)) {

  } else {
    nextChildren = instance.render();
  }

  workInProgress.effectTag |= PERFORMED_WORK;

  if (!isNull(current) && didCaptureError) {
    // 
  } else {
    reconcileChildren(
      current,
      workInProgress,
      nextChildren
    )
  }


  workInProgress.memoizedState = instance.state;

  return workInProgress.child;
}

function callComponentWillMount (
  workInProgress,
  instance
) {

}

function applyDerivedStateFromProps (
  workInProgress,
  Component,
  getDerivedStateFromProps,
  props
) {
  const state = workInProgress.memoizedState;
  const partialState = getDerivedStateFromProps(props, state);

  workInProgress.memoizedState = isNullOrUndefined(partialState) ?
    state : 
    {
      ...state,
      partialState
    };

  const updateQueue = workInProgress.updateQueue;

  if (!isNull(updateQueue) && workInProgress.isNoWork) {
    updateQueue.baseState = workInProgress.memoizedState;
  }
}

export default function updateClassComponent (
  current,
  workInProgress
) {
  const Component = workInProgress.type;
  const unresolvedProps = workInProgress.pendingProps;
  const resolvedProps = workInProgress.elementType === Component ?
    unresolvedProps :
    resolveDefaultProps(Component, unresolvedProps);

  const instance = workInProgress.stateNode;
  const hasContext = false;
  let shouldUpdate;

  if (isNullOrUndefined(instance)) {
    if (!isNullOrUndefined(current)) {
      current.alternate = null;
      workInProgress.alternate = null;
      workInProgress.effectTag |= PLACEMENT;
    }

    constructClassInstance(
      workInProgress,
      Component,
      resolvedProps
    );

    mountClassInstance(
      workInProgress,
      Component,
      resolvedProps
    );

    shouldUpdate = true;
  } else if (isNull(current)) {

  } else {
    shouldUpdate = updateClassInstance(
      workInProgress,
      Component,
      resolvedProps
    );
  }

  return finishClassComponent(
    current,
    workInProgress,
    Component,
    shouldUpdate,
    hasContext
  );
}