import { 
  isNull, 
  isUndefined, 
  isFunction, 
  isString,
} from '../shared/is';

import { REACT_ELEMENT_TYPE } from '../shared/elementTypes';

function ReactElement (
  type, 
  props = {}, 
  key = null,
  ref = null,
  owner = null
) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _owner: owner
  }

  return element;
}

export default function createElement (type, properties, ...children) {
  const { length } = children;
  const props = {
    ...properties
  };

  if (length > 0) {
    if (length === 1) {
      props.children = children[0];
    } else {
      props.children = children;
    }
  }

  return ReactElement(
    type, 
    props
  );
}