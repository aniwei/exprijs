import Element from './Element';

export default class HTMLElement extends Element {
  appendChild () {}
  removeChild () {}

  getAttribute () {}
  setAttribute () {}
  removeAttribute () {}

  addEventListener () {}
  removeEventListener () {}

  toString () {
    return `[object HTML${this.tagName}Element]`;
  }
}