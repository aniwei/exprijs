import requestWork from './requestWork';
import worker from './worker';

export default function scheduleWork (fiber) {
  const root = filber.root;

  // if isWorking resetWork;

  if (
    !worker.isWorking &&
    !worker.isCommintting
  ) {
    requestWork(root, rootExpirationTime);
  }
}