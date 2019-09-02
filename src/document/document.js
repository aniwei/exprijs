import HTMLBodyElement from './HTMLBodyElement';
import createElement from './createElement';
import createTextNode from './createTextNode';
import createContainer from './createContainer';


export default typeof document === 'undefined' ? {
  body: new HTMLBodyElement(),
  getElementById (id) {
    return createContainer('container');
  },
  getElementsByTagName () {},  
  querySelector () {},
  addEventListener (type, callback, capture) {
    debugger;
  },
  removeEventListener () {
    debugger;
  },
  createElement,
  createTextNode
} : document;