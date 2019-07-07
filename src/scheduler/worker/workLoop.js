import worker from './index';

function timeRemaining () {

}

export default function workLoop () {
  const deadline = worker.deadline;
  
  if (!worker.nextUnitOfWork) {

  } 



  while (worker.nextUnitOfWork &&
    (
      deadline ? 
        deadline.timeRemaining() > 1 :
        true
    )
  ) {
    worker.nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (worker.pendingCommit) {
    
  }
}