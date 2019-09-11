import worker from './index';

export default function resetWork (root) {
  worker.nextUnitOfWork = null;
  // worker.nextEffect = null;
  worker.root = root;
}