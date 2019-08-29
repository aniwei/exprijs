import { 
  HOST_ROOT,
  CLASS_COMPONENT,
  FUNCTION_COMPONENT
} from '../../shared/workTags';
import { isNull } from '../../shared/is';
import updateClassComponent from '../updater/updateClassComponent';
import updateFunctionComponent from '../updater/updateFunctionComponent';

export default function beginWork (
  current,
  workInProgress
) {
  const { tag } = workInProgress;

  if (!isNull(current)) {
    const props = current.memorizeProps;
    const newProps = workInProgress.pendingProps;

    if (
      props === newProps && 
      workInProgress.isNoWork
    ) {
      if (tag === HOST_ROOT) {
        pushHostRootContext(workInProgress);
      }

      cloneChildFibers(current, workInProgress);

      return workInProgress.child;
    }
  }

  

  switch (tag) {
    case HOST_ROOT: {
      break;
    }

    case CLASS_COMPONENT: {
      return updateClassComponent(
        current,
        workInProgress
      );
    }

    case FUNCTION_COMPONENT: {
      return updateFunctionComponent(
        current,
        workInProgress
      )
    }
  }
  
}