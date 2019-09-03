import { isNull, isNullOrUndefined } from '../../shared/is';
import { shallowEqual, resolveDefaultProps } from '../../shared';
import { PERFORMED_WORK } from '../../shared/effectTags';
import cloneChildFibers from '../../reconciler/cloneChildFibers';
import reconcileChildren from '../../reconciler/reconcileChildren'

export default function updateFunctionComponent (
  current, 
  workInProgress
) {
  const Component = workInProgress.type;
  const unresolvedProps = workInProgress.pendingProps;
  const nextProps = resolveDefaultProps(Component, unresolvedProps);

  let context;
  // todo  context;

  if (!isNullOrUndefined(current)) {
    const props = current.memorizedProps;

    if (
      shallowEqual(props, nextProps) &&
      current.ref === workInProgress.ref
    ) {
      cloneChildFibers(current, workInProgress);

      return workInProgress.child;
    }
  }

  const children = callFunctionComponent(Component, nextProps, context);
  
  workInProgress.effectTag |= PERFORMED_WORK;
  
  reconcileChildren(current, workInProgress, children);

  return workInProgress.child;
}

function callFunctionComponent (
  Component,
  nextProps,
  context
) {
  return Component(nextProps, context);
}