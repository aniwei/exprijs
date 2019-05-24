import { isFunction, EMPTY_CONTEXT, keys, assign } from '../shared';

const previousContext = {};

export function cacheContext () {

}

export function pushHostContext (workInProgress) {
  const instance = requiredContext()
}

export function requiredContext () {

}

export function processChildContext (workInProgress, Constructor, parentContext) {
  const instance = workInProgress.stateNode;

  if (isFunction(instance.getChildContext)) {
    const childContext = instance.getChildContext();

    return assign({}, parentContext, childContext);
  }

  return parentContext;
}

export function getUnmaskedContext (workInProgress, constructor, did) {

}

export function getMaskedContext (workInProgress, unmaskedContext) {
  const type = workInProgress.type;
  const contextTypes = type.contextTypes;

  if (contextTypes) {
    const instance = workInProgress.stateNode;
    const reactInternalMemoizedMaskedChildContext = instance._reactInternalMemoizedMaskedChildContext;

    if (instance && reactInternalMemoizedMaskedChildContext === unmaskedContext) {
      return reactInternalMemoizedMaskedChildContext;
    }

    const context = {};

    keys(contextTypes).forEach(key => context[key] = unmaskedContext[key]);

    if (instance) {
      cacheContext()
    }
  }

  return EMPTY_CONTEXT;
}

export function invalidateContextProvider (workInProgress, Constructor, didChange) {
  const { instance } = workInProgress.stateNode;

  if (didChange) {
    const mergedContext = processChildContext(workInProgress, Constructor, previousContext);
    instance.__reactInternalMemoizedMergedChildContext = mergedContext;

    // todo
    // pop(xxxx);
  } else {
    // todo 
    //pop(xxxx);
  }
}