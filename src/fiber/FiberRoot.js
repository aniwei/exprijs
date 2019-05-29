import { updateContainer } from './worker';

class FiberRoot {
  constructor (container) {
    this.container = container;
    this.current = current;
  }

  render (children) {
    updateContainer();
  }
}

export default FiberRoot;