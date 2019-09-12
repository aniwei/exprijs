import { isString, isUndefined } from './is';

const randomKey = Math.random().toString(36).slice(2);

export const CHILDREN = 'children';
export const HTML = '__html';
export const STYLE = 'style';
export const STYLE_NAME_FLOAT = 'float';
export const DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
export const INTERNAL_INSTANCE_KEY = '__reactInternalInstance$' + randomKey;
export const INTERNAL_EVENT_HANDLERS_KEY = '__reactEventHandlers$' + randomKey;

export const REACT_INTERNAL_FIBER = '_reactInternalFiber';
export const REACT_INTERNAL_INSTANCE = '_reactInternalInstance';

export const MERGED_CHILD_CONTEXT = '__reactInternalMemoizedMergedChildContext';
export const MASKED_CHILD_CONTEXT = '__reactInternalMemoizedMaskedChildContext';
export const UNMASKED_CHILD_CONTEXT = '__reactInternalMemoizedUnmaskedChildContext';

export const EMPTY_OBJECT = {};
export const EMPTY_ARRAY = [];
export const EMPTY_CONTEXT = {};
export const EMPTY_REFS = {};
export const EXPIRE_TIME = 1;


export const NO_WORK = 0;
export const WORKING = 1;

export function noop () {}
export const assign = Object.assign;
export const keys = Object.keys;

export function shouldSetTextContent (type, props) {
  // todo
  return isString(props.children) || false;
}

export function shallowEqual (
  objectA, 
  objectB
) {
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

export function resolveDefaultProps (
  Component,
  unresolvedProps
) {
  if (Component) {
    if (Component.defaultProps) {
      const props = { ... unresolvedProps };
      const defaultProps = Component.defaultProps;

      for (let propName in defaultProps) {
        if (isUndefined(props[propName])) {
          props[propName] = defaultProps[propName];
        }
      }

      return props;
    }
  }
  
  return unresolvedProps;
}

export function extend (
  target, 
  source,
) {
  if (source) {
    return assign(target, source);
  }

  return target;
}

export function clone (target) {
  return extend({}, clone);
}

