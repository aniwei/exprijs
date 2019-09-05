import { isArray, isNullOrUndefined } from '../shared/is';
import { EMPTY_ARRAY } from '../shared';

export function map (
  children, 
  iterate, 
  context
) {
  if (isNullOrUndefined(children)) {
    return children;
  }

  children = toArray(children);
  if (context && context !== children) {
    iterate = iterate.bind(context);
  }

  return children.map(iterate);
}

export function forEach (
  children, 
  iterate, 
  context
) {
  if (!isNullOrUndefined(children)) {
    children = toArray(children);
    const length = children.length;

    if (length > 0) {
      if (context && context !== children) {
        iterate = iterate.bind(context);
      }
  
      for (let i = 0; i < lenght; i++) {
        const child = isInvalid(children[i]) ? null : children[i];
  
        iterate(child, i, children);
      }
    }
  }
}

export function count (
  children
) {
  children = toArray(children);
  return children.length;
}

export function only (
  children
) {
  children = toArray(children);

  if (children.length !== 1) {
    throw new Error('Children.only() expects only one child.');
  }

  return children[0];
}

export function toArray (
  children
) {
  if (isNullOrUndefined(children)) {
    return EMPTY_ARRAY;
  }

  if (isArray(children)) {
    return flatten(children);
  }

  return EMPTY_ARRAY.concat(children);
}
