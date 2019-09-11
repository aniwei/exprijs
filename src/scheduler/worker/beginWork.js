import { 
  HOST_ROOT,
  CLASS_COMPONENT,
  FUNCTION_COMPONENT,
  HOST_TEXT,
  HOST_COMPONENT,
  INDETERMINATE_COMPONENT
} from '../../shared/workTags';
import { isNull, isNullOrUndefined } from '../../shared/is';
import cloneChildFibers from '../../reconciler/cloneChildFibers';
import updateClassComponent from '../updater/updateClassComponent';
import updateFunctionComponent from '../updater/updateFunctionComponent';
import mountIndeterminateComponent from '../updater/mountIndeterminateComponent';
import updateHostComponent from '../updater/updateHostComponent';
import updateHostRoot from '../updater/updateHostRoot';
import updateHostText from '../updater/updateHostText';

export default function beginWork (
  current,
  workInProgress
) {
  const { tag } = workInProgress;

  if (!isNullOrUndefined(current)) {
    if (tag === HOST_ROOT) {
      if (workInProgress.child) {
        cloneChildFibers(current, workInProgress);
  
        return workInProgress.child;
      }
    } else {
      const props = workInProgress.memoizedProps;
      const nextProps = workInProgress.pendingProps;

      if (
        props !== nextProps ||
        workInProgress.type !== current.type
      ) {
        cloneChildFibers(current, workInProgress);

        return workInProgress.child;
      }
    }
  }

  switch (tag) {
    case INDETERMINATE_COMPONENT: {
      return mountIndeterminateComponent(
        current, 
        workInProgress,
        workInProgress.type
      )
    }

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

    case HOST_COMPONENT: {
      return updateHostComponent(
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