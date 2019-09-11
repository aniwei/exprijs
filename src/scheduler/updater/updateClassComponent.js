import { resolveDefaultProps, shallowEqual, EMPTY_OBJECT, EMPTY_CONTEXT, REACT_INTERNAL_FIBER } from '../../shared';
import { isNull, isFunction, isNullOrUndefined, isLegacyContextConsumer, isContextProvider } from '../../shared/is';
import { PLACEMENT, UPDATE, PERFORMED_WORK, NO_EFFECT, DID_CAPTURE } from '../../shared/effectTags';
import classComponentUpdater from './classComponentUpdater';
import processUpdateQueue from './processUpdateQueue';
import reconcileChildren from '../../reconciler/reconcileChildren';
import ReactCurrentOwner from '../../react/ReactCurrentOwner';
import context from '../../context';
import updater from './index';
import getUnmaskedContext from '../../context/getUnmaskedContext';
import getMaskedContext from '../../context/getMaskedContext';



function constructClassInstance (
  workInProgress,
  Component,
  props
) {
  let ctx = EMPTY_CONTEXT;
  
  if (!context.disableLegacyContext) {
    const unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    if (isLegacyContextConsumer(Component)) {
      ctx = getMaskedContext(workInProgress, unmaskedContext);
    } else {
      ctx = EMPTY_CONTEXT;
    }
  }

  const instance = new Component(props, ctx);

  if (isNullOrUndefined(instance.state)) {
    workInProgress.memoizedState = null;
  } else {
    workInProgress.memoizedState = instance.state;
  }

  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  instance[REACT_INTERNAL_FIBER] = workInProgress;

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
  Component,
  nextProps
) { 
  const instance = workInProgress.stateNode;
  const props = workInProgress.memoizedProps;

  instance.props = workInProgress.type === workInProgress.elementType ? 
    props : resolveDefaultProps(workInProgress.type, props);

  const context = instance.context;
  const contextTypes = Component.contextTypes;
  let nextContext = EMPTY_CONTEXT;

  if (!isNullOrUndefined(contextTypes)) {
    nextContext = {};
  } else if (false) {

  }
  
  const getDerivedStateFromProps = Component.getDerivedStateFromProps;
  const hasNewLifecycles = isFunction(getDerivedStateFromProps) || isFunction(instance.getSnapshotBeforeUpdate);

  if (!hasNewLifecycles) {
    callComponentWillReceiveProps(
      instance,
      nextProps, 
      nextContext
    );
  }

  const state = workInProgress.memoizedState;
  const updateQueue = workInProgress.updateQueue;
  let newState = instance.state = state;

  if (!isNullOrUndefined(updateQueue)) {
    processUpdateQueue(workInProgress, updateQueue, nextProps, instance);
    newState = workInProgress.memoizedState;
  }

  if (props === nextProps && state === newState) {
    if (isFunction(instance.componentDidUpdate)) {
      if (props !== current.memoizedProps || state !== current.memoizedState) {
        workInProgress.effectTag |= Update;
      }
    }

    if (isFunction(instance.getSnapshotBeforeUpdate)) {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= Snapshot;
      }
    }
    return false;
  }

  if (isFunction(getDerivedStateFromProps)) {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps);
    newState = workInProgress.memoizedState;
  }

  const shouldUpdate = updater.isForceUpdate || callShouldComponentUpdate(workInProgress, Component, props, nextProps, state, newState, nextContext);

  if (shouldUpdate) {
    const componentWillMount = instance.UNSAFE_componentWillMount || instance.componentWillMount;
    if (
      !hasNewLifecycles && 
      isFunction(componentWillMount)
    ) {
      componentWillMount.call(instance);
    }
    if (isFunction(instance.componentDidMount)) {
      workInProgress.effectTag |= UPDATE;
    }
  } else {
    if (isFunction(instance.componentDidMount)) {
      workInProgress.effectTag |= UPDATE;
    }

    workInProgress.memoizedProps = nextProps;
    workInProgress.memoizedState = newState;
  }

  instance.props = nextProps;
  instance.state = newState;
  instance.context = nextContext;

  return shouldUpdate;
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

  if (hasContext) {
    context.invalidateProvider(workInProgress, Component, true);
  }

  return workInProgress.child;
}

function callShouldComponentUpdate(workInProgress, Component, props, nextProps, state, newState, nextContext) {
  const instance = workInProgress.stateNode;

  if (isFunction(instance.shouldComponentUpdate)) {
    let shouldUpdate = instance.shouldComponentUpdate(nextProps, newState, nextContext);
   
    return shouldUpdate;
  }

  if (Component.prototype && Component.prototype.isPureReactComponent) {
    return !shallowEqual(props, nextProps) || !shallowEqual(state, newState);
  }

  return true;
}

function callComponentWillReceiveProps (instance, nextProps, nextContext) {
  const componentWillReceiveProps = instance.UNSAFE_componentWillReceiveProps || instance.componentWillReceiveProps;
  if (isFunction(componentWillReceiveProps)) {
    const state = instance.state;

    componentWillReceiveProps.call(instance, instance.pendingProps, nextContext);

    if (instance.state !== state) {
      classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
    }
  }
}

function callComponentWillMount (
  workInProgress,
  instance
) {
  const state = instance.state;
  const componentWillMount = instance.UNSAFE_componentWillMount || instance.componentDidMount;

  if (isFunction(instance.componentWillMount)) {
    componentWillMount.call(instance);
  }

  if (state !== instance.state) {
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
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
  let hasContext = false;
  let shouldUpdate;

  if (isContextProvider(Component)) {
    hasContext = true;
    context.pushProvider(workInProgress);
  }

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
  } else {
    shouldUpdate = updateClassInstance(
      current,
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