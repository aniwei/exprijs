import { enqueueUpdate, createUpdate } from "../updater";
import { isFunction } from "../shared/is";
import { HOST_ROOT, CLASS_COMPONENT, FUNCTION_COMPONENT } from '../shared/workTags';

export function schedulRootUpdate (
  current, 
  element, 
  callback
) {
  const update = createUpdate();
  update.payload = { element };

  if (isFunction(callback)) {
    update.callback = callback;
  }

  enqueueUpdate(
    current,
    update
  );

  schedulWork(current)
}

export function schedulWork (fiber) {
  scheduleWorker.performWork(fiber);
}

const scheduleWorker = {
  nextUnitOfWork: null,
  pendingCommit: null,
}

scheduleWorker.beginWork = function (
  current,
  workInProgress
) {
  const { tag } = workInProgress;

  switch (tag) {
    case FUNCTION_COMPONENT: {
      const { 
        type: Component, 
        pendingProps: unresolvedProps 
      } = workInProgress;
      
      const resolvedProps = workInProgress.elementType === Component
        ? unresolvedProps
        : resolveDefaultProps(Component, unresolvedProps);

      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps
      )
    }

    case CLASS_COMPONENT: {
      const { 
        type: Component, 
        pendingProps: unresolvedProps 
      } = workInProgress;
      const resolvedProps = workInProgress.elementType === Component
        ? unresolvedProps
        : resolveDefaultProps(Component, unresolvedProps)
    
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderExpirationTime,
      )
    }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderExpirationTime)
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderExpirationTime)
    case HostText:
      return updateHostText(current, workInProgress)
    default:
      throw new Error(
        'Unknown unit of work tag. This error is likely caused by a bug in ' +
        'React. Please file an issue.',
      );
  }
}


scheduleWorker.performWork = function (dealline) {

}

scheduleWorker.performUnitOfWork = function (workInProgress) {
  const { alternate: current } = workInProgress;
  const next = this.beginWork(
    current, 
    workInProgress
  ) || this.completeUnitOfWork(workInProgress);

  ReactCurrentOwner.current = null;

  return next;
}

scheduleWorker.requestWork = function () {}

function resolveDefaultProps () {}