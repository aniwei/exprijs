import commitWork from './commitWork';
import worker from './index';

export default function commitAllWork (fiber) {
  fiber.effects.forEach(f => {
    commitWork(f);
  });
  fiber.stateNode._rootContainerFiber = fiber;
  worker.nextUnitOfWork = null;
  worker.pendingCommit = null;
};