import worker from './index';
import workLoop from './workLoop';
import { request } from 'requestidlecallback';

export default function performWork (deadline) {
  workLoop(deadline);

  const { nextUnitOfWork } = worker;

  if (nextUnitOfWork) {
    request(performWork);
  }
}
