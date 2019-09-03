import { CONTENT_RESET, REF } from '../../shared/effectTags';
import { isNullOrUndefined } from '../../shared/is';
import { shouldSetTextContent } from '../../shared';
import reconcileChildren from '../../reconciler/reconcileChildren';

export default function updateHostComponent (
  current,
  workInProgress
) {
  // pushHostContext(workInProgress);
  const type = workInProgress.type;
  const nextProps = workInProgress.pendingProps;
  const props = !isNullOrUndefined(current) ? 
    current.memoizedProps : null;

  let nextChildren = nextProps.children;
  var isDirectTextChild = shouldSetTextContent(type, nextProps);

  if (isDirectTextChild) {
    nextChildren = null;
  } else if (!isNullOrUndefined(props) && shouldSetTextContent(type, props)) {
    workInProgress.effectTag |= CONTENT_RESET;
  }

  const ref = workInProgress.ref;
  if (
    !isNullOrUndefined(current) && !isNullOrUndefined(ref) ||
    !isNullOrUndefined(current) && current.ref !== ref
  ) {
    workInProgress.effectTag |= REF;
  }

  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}