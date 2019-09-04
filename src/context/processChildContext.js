import { isFunction } from '../shared/is';
import context from '../context';

export default function processChildContext (
  workInProgress, 
  type, 
  parentContext
) {
  if (!context.disableLegacyContext) {
    const instance = workInProgress.stateNode;
    const childContextTypes = type.childContextTypes;
    
    if (!isFunction(instance.getChildContext)) {
      return parentContext;
    }

    const context = instance.getChildContext();

    return {
      ...parentContext,
      ...context
    }
  } else {
    return parentContext;
  }
}