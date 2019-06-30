import performUnitOfWork from './performUnitOfWork';
import worker from './index';
import { isNull } from '../../shared/is';

function shouldYield () {

}

export default function workLoop(isYieldy) {
  if (!isYieldy) {
    while (!isNull(worker.nextUnitOfWork)) {
      worker.nextUnitOfWork = performUnitOfWork(worker.nextUnitOfWork);
    }
  } else {
    while (
      !isNull(worker.nextUnitOfWork) &&
      !shouldYield()
    ) {
      worker.nextUnitOfWork = performUnitOfWork(worker.nextUnitOfWork);
    }
  }
}