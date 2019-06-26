import HTMLBodyElement from './HTMLBodyElement';
import createElemeent from './createElement';
import createTextNode from './createTextNode';
import createContainer from './createContainer';


export default typeof document === 'undefined' ? {
  body: new HTMLBodyElement(),
  getElementById (id) {
    return createContainer('container');
  },
  getElementsByTagName () {},  
  querySelector () {},
  createElemeent,
  createTextNode
} : document;