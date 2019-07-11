import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeTypes';
import ownerDocument from './document';

export default function createElement (tagName, properties) {
  const element = new HTMLElement(tagName);
  element.nodeType = ELEMENT_NODE;

  element.ownerDocument = ownerDocument;

  return element;
}