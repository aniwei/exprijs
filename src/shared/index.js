export const EMPTY_OBJECT = {};
export const EMPTY_ARRAY = [];
export const EMPTY_CONTEXT = {};

export function noop () {}
export const assign = Object.assign;
export const keys = Object.keys;

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

