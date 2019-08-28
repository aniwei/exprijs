import { createFiberRoot } from './createWorkProgress';

export default function createContainer (container) {
  return createFiberRoot(container);
}