import Element from './Element';

export default class HTMLElement extends Element {
  

  appendChild (element) {
    const child = this.child;

    if (child) {
      let silbing = child;

      while (silbing.silbing) {
        silbing = silbing.silbing;
      }

      silbing.silbing = element;
      element.return = this;
    } else {
      this.child = element;
      element.return = this;
    }
  }
  removeChild (element) {
    const child = this.child;

    debugger;
    
    if (child === element) {
      const silbing = child.silbing;
      
      if (silbing) {
        this.child = silbing;
      } else {
        this.child = null;
        child.return = null;
      }
    } else {
      let silbing = child;
      while (silbing.silbing) {
        if (silbing.silbing === element) {
          silbing.silbing.return = null;
          silbing.silbing = silbing.silbing.silbing;
          break;
        } else {
          silbing = silbing.silbing;
        }
      }
    }
  }

  getAttribute () {}
  setAttribute () {}
  removeAttribute () {}

  addEventListener () {
    debugger;
  }
  removeEventListener () {}

  toString () {
    return `[object HTML${this.tagName}Element]`;
  }
}