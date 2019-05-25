import { isUndefined } from '../shared';

const constants = {};

class HTMLElement {
  constructor (tagName) {
    this.tagName = tagName;
    this.nodeName = tagName;
    this.children = [];
    this.parentElement = null;
    this.ownerDocument = constants.document;

    this.effects = [];
  }

  appendChild (node) {
    if (node instanceof HTMLElement) {
      node.parentElement = this;
      this.children.push(node);
    }
  }

  removeChild (node) {
    if (node instanceof HTMLElement) {
      const index = this.children.indexOf(node);

      if (index > -1) {
        this.children.splice(index);
        node.parentElement = null;
      }
    }
  }

  set innerText (text) {}
  set innerHTML (html) {}
}

function createDocument () {   
  return constants.document || (constants.document = {
    body: new HTMLElement('body'),
    getElementById (id) {
      return this.body
    },

    createElement (tagName, properties) {
      const element = new HTMLElement(tagName);

      return element;
    }
  })
}

function getDocument () {
  return createDocument();

  if (typeof document === 'undefined') {
    return createDocument();
  }

  return document;
}

export function createElement (type, props) {
  const node = new HTMLElement(type);

  return node;
}

export const document = getDocument();