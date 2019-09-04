import { EMPTY_CONTEXT } from '../shared';
import { isContextProvider } from '../shared/is';
import context, { contextCursor } from './index';

export default function getUnmaskedContext (
  workInProgress, 
  Component,
) {
  if (context.disableLegacyContext) {
    return EMPTY_CONTEXT;
  } else {
    if (isContextProvider(Component)) {
      return context.previousContext;
    }

    return contextCursor.current;
  }
}