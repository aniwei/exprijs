import { document } from '../document';
import { isString } from '../shared/is';

export function createInstance (
  type,
  props,
) {
  const element = isString(props.is) ?
    document.createElement(type, { is: props.is }) :
    document.createElement(type);

  // element.__reactInternalInstance = 

  return element;
}

export function createTextInstance (
  text
) {
  const node = document.createTextNode(text);

  return node;
}

function updateDOMProperties (
  element,
  
) {

}

function addEventListener (
  element, 
  type, 
  callback
) {
  element.addEventListener(type, callback, false);
}

function removeEventListener (
  element,
  type,
  callback
) {
  element.removeEventListener(type, callback, false);
}

