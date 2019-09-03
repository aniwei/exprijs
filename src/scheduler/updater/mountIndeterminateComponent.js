import { isNullOrUndefined } from '../../shared/is'
import { PLACEMENT, PERFORMED_WORK } from '../../shared/effectTags';
import { FUNCTION_COMPONENT } from '../../shared/workTags';
import reconcileChildren from '../../reconciler/reconcileChildren';

export default function mountIndeterminateComponent (
  current,
  workInProgress,
  Component
) {
  if (!isNullOrUndefined(current)) {
    current.alternate = null;
    workInProgress.alternate = null;
    
    workInProgress.effectTag |= PLACEMENT;
  }

  const nextProps = workInProgress.pendingProps;
  let context;
  // if (!disableLegacyContext) {
  //   var unmaskedContext = getUnmaskedContext(workInProgress, Component, false);
  //   context = getMaskedContext(workInProgress, unmaskedContext);
  // }
  // prepareToReadContext(workInProgress, renderExpirationTime);

  workInProgress.effectTag |= PERFORMED_WORK;
  workInProgress.tag = FUNCTION_COMPONENT;

  // const children = Component(nextProps, context);

  // reconcileChildren(null, workInProgress, null);
  
  return workInProgress;
}