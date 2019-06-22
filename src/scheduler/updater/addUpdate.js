function addUpdate(
  fiber: Fiber,
  partialState: PartialState<any, any> | null,
  callback: mixed,
  priorityLevel: PriorityLevel,
): void {
  const update = {
    priorityLevel,
    partialState,
    callback,
    isReplace: false,
    isForced: false,
    isTopLevelUnmount: false,
    next: null,
  };
  insertUpdate(fiber, update);
}