import { isNull } from '../../shared/is';
import { shallowEqual, resolveDefaultProps } from '../../shared';
import cloneChildFibers from '../../reconciler/cloneChildFibers';
import reconcileChildren from '../../reconciler/reconcileChildren'
import { PERFORMED_WORK } from '../../shared/effectTags';

export default function updateFunctionComponent (
  current, 
  workInProgress
) {
  const Component = workInProgress.type;
  const unresolvedProps = workInProgress.pendingProps;
  const nextProps = resolveDefaultProps(Component, unresolvedProps);

  if (
    !isNull(current) &&
    workInProgress.isNoWork
  ) {
    const props = current.memorizedProps;

    if (
      shallowEqual(props, nextProps) &&
      current.ref === workInProgress.ref
    ) {
      cloneChildFibers(current, workInProgress);

      return workInProgress.child;
    }
  }

  const children = finishedWork(Component, nextProps, Component(nextProps));
  workInProgress.effectTag |= PERFORMED_WORK;
  reconcileChildren(current, workInProgress, children);

  return workInProgress.child;
}