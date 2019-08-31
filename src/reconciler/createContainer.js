import { createFiberRoot } from './FiberNode';

export default function createContainer (container) {
  return createFiberRoot(container);
}