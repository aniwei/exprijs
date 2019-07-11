import uuid from 'uuid/v4';

export default class Element {
  constructor (tagName) {
    this.uuid = uuid();
    this.tagName = tagName;
    this.nodeType = null;
    
    this.child = null;
    this.return = null;
    this.silbing = null;
    this.style = {};
  }
}