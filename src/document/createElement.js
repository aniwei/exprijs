import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';

export default function createElement (tagName, properties) {
  const element = new HTMLElement(tagName);
  element.nodeType = ELEMENT_NODE;

  return element;
}