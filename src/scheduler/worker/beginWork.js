import { 
  HOST_ROOT,
  CLASS_COMPONENT,
  FUNCTION_COMPONENT,
  HOST_TEXT
} from '../../shared/workTags';
import { isNull, isNullOrUndefined } from '../../shared/is';
import cloneChildFibers from '../../reconciler/cloneChildFibers';
import updateClassComponent from '../updater/updateClassComponent';
import updateFunctionComponent from '../updater/updateFunctionComponent';
import updateHostComponent from '../updater/updateHostComponent';
import updateHostRoot from '../updater/updateHostRoot';
import updateHostText from '../updater/updateHostText';
import scheduler from '..';

export default function beginWork (
  current,
  workInProgress
) {
  const { tag } = workInProgress;

  // if (!isNullOrUndefined(current)) {
  //   const props = current.memoizedProps;
  //   const newProps = workInProgress.pendingProps;

  //   if (props === newProps) {
  //     if (tag === HOST_ROOT) {
  //       // pushHostRootContext(workInProgress);
  //     }

  //     if (!scheduler.isRendering) {
  //       cloneChildFibers(current, workInProgress);
  
  //       return workInProgress.child;
  //     }
  //   }
  // }

  

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