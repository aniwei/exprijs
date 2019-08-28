import pushHostRootContext from '../../context/pushHostRootContext';
import reconcileChildren from '../../reconciler/reconcileChildren';

export default function updateHostRoot (
  current,
  workInProgress,
) {
  pushHostRootContext(workInProgress);

  const reactRoot = workInProgress._reactRoot;
  const nextProps = workInProgress.pendingProps;
  const state = workInProgress.memorizeState;
  const child = isNull(state) ?
    null : state.element;

  
  const nextState = workInProgress.memorizeState;
  const children = nextState.element;

  reconcileChildren(current, workInProgress, children);

  return workInProgress.child;
}