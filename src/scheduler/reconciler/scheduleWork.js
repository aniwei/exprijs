import worker from '../worker';
import requestWork from '../worker/requestWork';

export default function scheduleWork (fiber) {
  const root;

  if (
    !worker.isWorking ||
    worker.isCommintting
  ) {
    requestWork(root);
  }
}