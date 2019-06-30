import worker from '../worker';
import requestWork from '../worker/requestWork';

export default function scheduleWork (fiber, isAsync) {

  if (
    !worker.isWorking ||
    worker.isCommitting
  ) {
    requestWork(fiber, isAsync);
  }
}