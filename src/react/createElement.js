import ReactElement from './ReactElement';
import { isFunction, isUndefined } from '../shared/is';
import { resolveDefaultProps } from '../shared';

export default function createElement (
  type, 
  props, 
  ...children
) {
  const { length } = children;

  if (isFunction(type)) {
    props = resolveDefaultProps(type, props);
  }

  if (length > 0) {
    if (length === 1) {
      props.children = children[0];
    }
  } 

  return ReactElement(
    type, 
    { ...props }
  );
}