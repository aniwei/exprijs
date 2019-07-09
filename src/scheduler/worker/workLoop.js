import worker from './index';


export default function workLoop () {
  const { deadline, nextUnitOfWork } = worker;
  
  if (!nextUnitOfWork) {

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