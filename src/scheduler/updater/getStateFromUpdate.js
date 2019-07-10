import { UPDATE_STATE, FORCE_UPDATE } from '../../shared/updateTags';
import { isFunction, isNull, isUndefined } from '../../shared/is';

export default function getStateFromUpdate (
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  const { tag } = update;
  
  switch (tag) {
    case UPDATE_STATE: {
      const payload = update.payload;
      const partialState = isFunction(payload) ? 
        payload.call(instance, prevState, nextProps) :
        payload;

      if (isNull(partialState) || isUndefined(partialState)) {
        return prevState;
      }
      
      return {
        ...prevState,
        ...partialState
      }
    }
    
    case FORCE_UPDATE: {
      
    }
  }
  
  return prevState;
}