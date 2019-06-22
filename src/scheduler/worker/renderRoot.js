
export default function renderRoot (root, isYieldy) {
  worker.isWorking = true;

  ReactCurrentOwner.currentDispatcher = Dispatcher;

  if (
    root !== nextRoot ||
    isNull(worker.nextUnitOfWork)
  ) {
    resetStack();
    nextRoot = root;

    worker.nextUnitOfWork = createWorkInProgress(
      nextRoot.current,
      null
    );

    do {
      try {
        workLoop(isYieldy);
      } catch (thrownValue) {
        if (isNull(worker.nextUnitOfWork)) {
          worker.didFatal = true;
          onUncaughtError(thrownValue);
        } else {
          const sourceFiber = worker.nextUnitOfWork;
          const returnFiber = sourceFiber.return;

          if (isNull(returnFiber)) {
            worker.didFatal = true;
            onUncaughtError(thrownValue);
          } else {
            throwException(
              root, 
              returnFiber,
              sourceFiber,
              thrownValue
            );

            worker.nextUnitOfWork = completeUnitOfWork(sourceFiber);
          }
        }
      }
    } while (true);

    worker.isWorking = false;
    ReactCurrentOwner.currentDispatcher = null;

    resetContextDependences();

    if (worker.didFatal) {
      const didCompleteRoot = false;

      nextRoot = null;
      onFatal(root);
    }

    if (!isNull(worker.nextUnitOfWork)) {
      const didCompleteRoot = false;
    }
  }
}



