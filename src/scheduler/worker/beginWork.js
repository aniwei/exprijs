import { 
  HOST_ROOT,
  CLASS_COMPONENT,
  FUNCTION_COMPONENT
} from '../../shared/workTags';
import { isNull } from '../../shared/is';

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
      break;
    }

    case FUNCTION_COMPONENT: {
      return 
    }
  }
  
}