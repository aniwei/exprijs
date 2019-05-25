const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export const EMPTY_OBJECT = {};
export const EMPTY_ARRAY = [];
export const EMPTY_CONTEXT = {};

export const NO_EFFECT = 0;
export const NO_WORK = 0;
export const PLACEMENT = 2;
export const UPDATE = 4;
export const IN_COMPLETE = 1024;


export const workTags = {
  FUNCTION_COMPONENT: 0,
  CLASS_COMPONENT: 1,
  HOST_ROOT: 2
}

export const effectTags = {

}

export const elementTypes = {
  REACT_ELEMENT_TYPE: hasSymbol ? Symbol.for('react.element') : 0xeac7,
  REACT_PORTAL_TYPE: hasSymbol ? Symbol.for('react.portal') : 0xeaca,
  REACT_FRAGMENT_TYPE: hasSymbol ? Symbol.for('react.fragment') : 0xeacb,
  REACT_STRICT_MODE_TYPE: hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc,
  REACT_PROFILER_TYPE: hasSymbol ? Symbol.for('react.profiler') : 0xead2,
  REACT_PROVIDER_TYPE: hasSymbol ? Symbol.for('react.provider') : 0xeacd,
  REACT_CONTEXT_TYPE: hasSymbol ? Symbol.for('react.context') : 0xeace,
  REACT_ASYNC_MODE_TYPE: hasSymbol ? Symbol.for('react.async_mode') : 0xeacf,
  REACT_CONCURRENT_MODE_TYPE:hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf,
  REACT_FORWARD_REF_TYPE: hasSymbol ? Symbol.for('react.forward_ref'): 0xead0,
  REACT_SUSPENSE_TYPE: hasSymbol ? Symbol.for('react.suspense') : 0xead1,
  REACT_MEMO_TYPE: hasSymbol ? Symbol.for('react.memo') : 0xead3,
  REACT_LAZY_TYPE: hasSymbol ? Symbol.for('react.lazy') : 0xead4
}

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

export function isObject (o) {
  return typeof o === 'object' && !isNull(o);
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



let internalTimeout = null;

export function requestIdleCallback (callback = noop) {
  debugger;
  callback({})
}

export function noop () {}
