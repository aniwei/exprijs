import {
  FUNCTION_COMPONENT,
  CLASS_COMPONENT,
  HOST_ROOT,

} from '../../shared/workTags';

import updateFunctionComponent from '../updater/updateFunctionComponent'

export default function beginWork (
  current, 
  workInProgress,
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
    case HOST_ROOT:
      return updateHostRoot(current, workInProgress, renderExpirationTime)
    case HOST_COMPONENT:
      return updateHostComponent(current, workInProgress, renderExpirationTime)
    case HOST_TEXT:
      return updateHostText(current, workInProgress)
    default:
      throw new Error(
        'Unknown unit of work tag. This error is likely caused by a bug in ' +
        'React. Please file an issue.',
    );
  }
}