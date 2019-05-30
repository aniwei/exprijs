import { 
  isArray,
  isNullOrUndefined,
} from './shared/is';
import {
  flatten,
  EMPTY_ARRAY
} from './shared';
  
  
const Children = {
  map (children, iterate, context) {
    if (isNullOrUndefined(children)) {
      return children;
    }

    children = Children.toArray(children);
    if (context && context !== children) {
      iterate = iterate.bind(context);
    }

    return children.map(iterate);
  },

  forEach (
    children,
    iterate,
    context
  ) {
    if (!isNullOrUndefined(children)) {
      children = Children.toArray(children);
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
  },

  count (children) {
    children = Children.toArray(children);
    return children.length;
  },

  only (children) {
    children = Children.toArray(children);
    if (children.length !== 1) {
      throw new Error('Children.only() expects only one child.');
    }

    return children[0];
  },

  toArray (children) {
    if (isNullOrUndefined(children)) {
      return EMPTY_ARRAY;
    }

    if (isArray(children)) {
      return flatten(children);
    }

    return EMPTY_ARRAY.concat(children);
  }
}

export default Children;