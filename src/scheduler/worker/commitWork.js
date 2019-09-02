import { FUNCTION_COMPONENT, HOST_COMPONENT, HOST_TEXT } from '../../shared/workTags';
import { isNullOrUndefined } from '../../shared/is';
import { INTERNAL_EVENT_HANDLERS_KEY } from '../../shared';

export default function commitWork (
  current,
  nextEffect
) {
  const { tag } = nextEffect;

  switch (tag) {
    case FUNCTION_COMPONENT: {
      break;
    }

    case HOST_COMPONENT: {
      const instance = nextEffect.stateNode;
      if (!isNullOrUndefined(instance)) {
        const nextProps = finishedWork.memoizedProps;
        const props = !isNullOrUndefined(current) ? current.memoizedProps : nextProps;
        const type = nextEffect.type;

        const updateQueue = finishedWork.updateQueue;

        finishedWork.updateQueue = null;
        if (isNullOrUndefined(updateQueue)) {
          commitUpdate(instance, updateQueue, type, props, nextEffect, finishedWork);
        }
      }
      break;
    }

    case HOST_TEXT: {
      const instance = nextEffect.stateNode;
      const nextText = finishedWork.memoizedProps;
      const text = isNullOrUndefined(current) ? current$$1.memoizedProps : nextText;
      debugger;
      commitTextUpdate(instance, text, nextText);
      return;
    }
  }
}

function commitUpdate (
  instance, 
  updateQueue, 
  type, 
  props, 
  nextProps, 
  finishedWork
) {
  instance[INTERNAL_EVENT_HANDLERS_KEY] = nextProps;
  updateProperties(instance, updateQueue, tag, props, nextProps);
}