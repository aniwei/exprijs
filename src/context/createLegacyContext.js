import { EMPTY_CONTEXT, MERGED_CHILD_CONTEXT } from '../shared';
import processChildContext from './processChildContext';

export default function createLegacyContext (
  context = EMPTY_CONTEXT,
  disableLegacyContext = false,
) {

  return {
    disableLegacyContext,
    previousContext: EMPTY_CONTEXT,
    stack: [],
    index: -1,
    cursor: {
      current: context
    },

    pop (cursor, currentFiber) {
      if (this.index > -1) {
        const { fiber, current } = this.stack[this.index];

        cursor.current = current;
        
        this.stack[this.index] = null;
        this.index--;
      }  
    },

    push (cursor, value, fiber) {
      this.stack[++this.index] = {
        current: cursor.current,
        fiber
      };

      cursor.current = value;
    },

    pushProvider (workInProgress) {
      if (this.disableLegacyContext) {
        return false;
      } else {
        const instance = workInProgress.stateNode;
        const memoizedMergedChildContext = instance ? 
          instance[MERGED_CHILD_CONTEXT] : EMPTY_CONTEXT;

        this.previousContext = this.cursor.current;
        this.push(this.cursor, memoizedMergedChildContext, workInProgress);
      }
    },

    invalidateProvider (
      workInProgress,
      Component,
      changed
    ) {
      if (!context.disableLegacyContext) {
        const instance = workInProgress.stateNode;

        if (changed) {
          const mergedContext = processChildContext(workInProgress, Component, this.previousContext);
          instance[MERGED_CHILD_CONTEXT] = mergedContext;

          this.pop(this.cursor, workInProgress);
          this.push(this.cursor, mergedContext, workInProgress);
        }
      }
    }
  }
}
