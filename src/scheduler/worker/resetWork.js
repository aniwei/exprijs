import worker from './index';

export default function resetWork () {
  worker.nextUnitOfWork = null;
  worker.nextEffect = null;
}