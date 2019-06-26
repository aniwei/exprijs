import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeTypes';
import document from './document';

export default class HTMLBodyElement extends HTMLElement {
  tagName = 'body';
  nodeType = ELEMENT_NODE;

  get ownerDocument () {
    return document;
  }
}