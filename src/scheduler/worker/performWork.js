import * as shared from '../../shared';
import workLoop from './workLoop';

export default function performWork (deadline) {
  workLoop(deadline);
  if (shared.nextUnitOfWork || shared.updateQueue.length > 0) {
    requestIdleCallback(performWork);
  }
};
