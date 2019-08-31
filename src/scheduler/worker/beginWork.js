import { 
  HOST_ROOT,
  CLASS_COMPONENT,
  FUNCTION_COMPONENT,
  HOST_TEXT
} from '../../shared/workTags';
import { isNull, isNullOrUndefined } from '../../shared/is';
import updateClassComponent from '../updater/updateClassComponent';
import updateFunctionComponent from '../updater/updateFunctionComponent';
import updateHostComponent from '../updater/updateHostComponent';
import updateHostRoot from '../updater/updateHostRoot';
import updateHostText from '../updater/updateHostText';

export default function beginWork (
  current,
  workInProgress
) {
  const { tag } = workInProgress;

  if (!isNullOrUndefined(current)) {
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
      return updateHostRoot(
        current,
        workInProgress
      );
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

    case HOST_TEXT: {
      return updateHostText(
        current,
        workInProgress
      );
    }
  }
  
}