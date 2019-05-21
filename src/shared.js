export const EMPTY_OBJECT = {};
export const EMPTY_ARRAY = [];


export const workTags = {
  FunctionComponent: 0,
  ClassComponent: 1,
  HostRoot: 2
}

// export const FunctionComponent = 0;
// export const ClassComponent = 1;
// export const IndeterminateComponent = 2; // Before we know whether it is function or class
// export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
// export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
// export const HostComponent = 5;
// export const HostText = 6;
// export const Fragment = 7;
// export const Mode = 8;
// export const ContextConsumer = 9;
// export const ContextProvider = 10;
// export const ForwardRef = 11;
// export const Profiler = 12;
// export const SuspenseComponent = 13;
// export const MemoComponent = 14;
// export const SimpleMemoComponent = 15;
// export const LazyComponent = 16;
// export const IncompleteClassComponent = 17;
// export const DehydratedSuspenseComponent = 18;
// export const EventComponent = 19;
// export const EventTarget = 20;

export const isArray = Array.isArray;
export const assign = Object.assign;
export const keys = Object.keys;
export const is = Object.is || function (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }

  return x !== x && y !== y;
}

export function isNull (o) {
  return o === null;
}

export function isUndefined (o) {
  return o === undefined;
}

export function isFunction (o) {
  return typeof o === 'function';
}

export function isString (o) {
  return typeof o === 'string';
}

export function isNumber (o) {
  return typeof o === 'number';
}

export function isNullOrUndefined (o) {
  return o === undefined || o === null;
}

export function isInvalid (o) {
  return isNullOrUndefined(o) || o === true || o === false
}

export function isVNode (node) {
  return !isNullOrUndefined(node) && node.vtype === VType.Node
}

export function isVText (node) {
  return !isNullOrUndefined(node) && node.vtype === VType.Text
}

export function isComponent (instance) {
  return !isInvalid(instance) && instance.isReactComponent === EMPTY_OBJ
}

export function isWidget (
  node
) {
  return (
    !isNullOrUndef(node) &&
    (node.vtype & (VType.Composite | VType.Stateless)) > 0
  )
}

export function isComposite (node) {
  return !isNullOrUndef(node) && node.vtype === VType.Composite
}

export function isStateless (node) {
  return !isNullOrUndef(node) && node.vtype === VType.Stateless
}

export function isValidElement (node) {
  return !isNullOrUndef(node) && node.vtype
}

export function isHook (arg) {
  return !isNullOrUndef(arg) && typeof arg.vhook === 'number'
}

export function flatten (array, result = []) {
  const length = array.length;

  for (let i = 0; i < length; i++) {
    const value = array[i];
    if (isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
}

export function shallowEqual (objectA, objectB) {
  if (objectA === null || objectB === null) {
    return false;
  }

  if (is(objectA, objectB)) {
    return true;
  }

  const keysA = objectA ? keys(objectA) : [];
  const keysB = objectB ? keys(objectB) : [];

  if (keysA.length !== keysB.length) {
    return false;
  }

  const length = objectA.length;

  for (let i = 0; i < length; i++) {
    const key = keysA[i];

    if (
      !objectA.hasOwnProperty(key) || 
      !is(objectA[key], objectB[key])
    ) {
      return false;
    }
  }

  return true;
}

export function extend (target, source) {
  if (source) {
    return assign(target, source);
  }

  return target;
}

export function clone (target) {
  return extend({}, clone);
}

export function requestIdleCallback () {

}

export function noop () {}
