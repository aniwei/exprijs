import ReactElement from './ReactElement';
import { isFunction } from '../shared/is';
import { resolveDefaultProps } from '../shared';

export default function createElement (
  type, 
  props, 
  ...children
) {
  const { length } = children;

  if (length > 0) {
    if (length === 1) {
      children = children[0];
    }
  } else {
    children = undefined;
  } 

  if (isFunction(type)) {
    props = resolveDefaultProps(type, props);
  }

  return ReactElement(
    type, 
    { ...props, children }
  );
}