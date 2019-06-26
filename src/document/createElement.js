import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeTypes';

export default function createElement (tagName, properties) {
  const element = new HTMLElement(tagName);
  element.nodeType = ELEMENT_NODE;

  return element;
}