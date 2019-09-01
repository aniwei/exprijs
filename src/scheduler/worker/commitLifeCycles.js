import { CLASS_COMPONENT, FUNCTION_COMPONENT, HOST_ROOT } from '../../shared/workTags';
import { UPDATE } from '../../shared/effectTags';
import { isNullOrUndefined } from '../../shared/is';
import { resolveDefaultProps } from '../../shared';
import commitUpdateQueue from './commitUpdateQueue';

export default function commitLifeCycles (
  root,
  current,
  finishedWork
) {
  const { tag } = finishedWork;

  switch (tag) {
    case FUNCTION_COMPONENT: {
      break;
    }

    case CLASS_COMPONENT: {
      const instance = finishedWork.stateNode;

      if (finishedWork.effectTag & UPDATE) {
        if (isNullOrUndefined(current)) {
          instance.componentDidMount ();
        } else {
          const props = finishedWork.elementType === finishedWork.type ? 
            current.memoizedProps : 
            resolveDefaultProps(finishedWork.type, current.memoizedProps);
          const state = current.memoizedState;

          instance.componentDidUpdate(props, state, instance.__reactInternalSnapshotBeforeUpdate);
        }
      }

      const updateQueue = finishedWork.updateQueue;

      if (!isNullOrUndefined(updateQueue)) {
        commitUpdateQueue();
      }
      break;
    }

    case HOST_ROOT: {
      const updateQueue = finishedWork.updateQueue;

      if (!isNullOrUndefined(updateQueue)) {
        let instance;

        if (!isNullOrUndefined(finishedWork.child)) {
          switch (finishedWork.child.tag) {
            case HostComponent:
              instance = getPublicInstance(finishedWork.child.stateNode);
              break;
            case ClassComponent:
              instance = finishedWork.child.stateNode;
              break;
          }
        }

        commitUpdateQueue();
      }
      break;
    }
  }
}