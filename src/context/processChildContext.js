import { isFunction } from '../shared/is';

export default function processChildContext (
  workInProgress, 
  type, 
  parentContext
) {
  const instance = workInProgress.stateNode;
  const childContextTypes = type.childContextTypes;

  if (isFunction()) {

  }
}