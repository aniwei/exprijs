import { HOST_COMPONENT, HOST_PORTAL, HOST_ROOT } from './workTags';

export const isArray = Array.isArray;

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

export function isComponentConstructor (Component) {
  const proto = Component.prototype;

  return !!(proto && proto.isReactComponent);
}

export function isLegacyContextConsumer (Component) {
  const contextTypes = Component.contextTypes;

  return !isNullOrUndefined(contextTypes);
}

export function isContextProvider (Component) {
  const { childContextTypes } = Component;
  
  return !isNullOrUndefined(childContextTypes);
}

export function isHostParent (fiber) {
  const { tag } = fiber;

  return (
    tag === HOST_COMPONENT ||
    tag === HOST_ROOT ||
    tag === HOST_PORTAL
  );
}

export const is = Object.is || function (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }

  return x !== x && y !== y;
}