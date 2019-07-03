import worker from './index';

export default function workLoop () {
  const deadline = worker.deadline;
  
  if (!worker.nextUnitOfWork) {

  } 

  while (
    worker.nextUnitOfWork &&
    (
      deadline ? 
        deadline.timeRemaining() > 1 :
        true
    )
  ) {
    worker.nextUnitOfWork = performUnitOfWork();
  }

  if (worker.pendingCommit) {
    
  }
}