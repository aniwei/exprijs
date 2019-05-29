import uuid from 'uuid/v4';

export default class Element {
  uuid = uuid();
  tagName = null;
  nodeType = null;
  child = null;
  return = null;
}