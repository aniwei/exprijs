import { document } from '../../document';
import { isString } from '../../shared/is';

export default function createInstance (
  type,
  props,
) {
  const element = isString(props.is) ?
    document.createElement(type, { is: props.is }) :
    document.createElement(type);

  // element.__reactInternalInstance = 

  return element;
}