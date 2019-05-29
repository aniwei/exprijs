import HTMLBodyElement from './HTMLBodyElement';
import createElemeent from './createElement';
import createTextNode from './createTextNode';


export default typeof document === 'undefined' ? {
  body: new HTMLBodyElement(),
  getElementById () {

  },
  getElementsByTagName () {},  
  querySelector () {},
  createElemeent,
  createTextNode
} : document;