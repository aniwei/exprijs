import context from './index';
import { EMPTY_CONTEXT, MERGED_CHILD_CONTEXT } from '../shared';

export default function getMaskedContext (
  workInProgress,
  unmaskedContext
) {
  if (context.disableLegacyContext) {
    return EMPTY_CONTEXT;
  }

  const type = workInProgress.type;
  const contextTypes = type.contextTypes;

  if (!contextTypes) {
    return EMPTY_CONTEXT;
  }

  const instance = workInProgress.stateNode;

  if (instance) {
    const mergedContext = instance[MERGED_CHILD_CONTEXT];
    if (instance[MERGED_CHILD_CONTEXT] === unmaskedContext) {
      return mergedContext;
    }
  }

  const ctx = {};

  for (let contextKey in contextTypes) {
    ctx[contextKey] = unmaskedContext[contextKey];
  }

  if (instance) {
    if (!context.disableLegacyContext) {
      instance[MERGED_CHILD_CONTEXT] = ctx;
    }
  }

  return ctx;
}