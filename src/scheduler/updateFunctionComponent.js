export default function updateFunctionComponent (
  current,
  workInProgress
) {
  const {
    type: functionComponent,
    pendingProps: nextProps
  } = workInProgress;
  
  if (hasLegacyContextChanged()) {
    // Normally we can bail out on props equality but if context has changed
    // we don't do the bailout and we have to reuse existing props instead.
  } else {
    if (workInProgress.memoizedProps === nextProps) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }
  }

  const unmaskedContext = getUnmaskedContext(workInProgress);
  const context = getMaskedContext(workInProgress, unmaskedContext);

  let nextChildren;

  
  nextChildren = functionComponent(nextProps, context);
  
  workInProgress.effectTag |= PerformedWork;
  
  reconcileChildren(current, workInProgress, nextChildren);
  memoizeProps(workInProgress, nextProps);
  
  return workInProgress.child;
}