import { isNull, isString, isNumber, isArray } from '../shared/is';

export default function ChildrenReconciler (
  shouldTrackSideEffects
) {

  function reconcileSingleTextElement (
    returnFNode, 
    currentFirstChild,
    newChild
  ) {

  }

  function reconcileSingleElement (
    returnFiber,
    currentFirstChild,
    newChild
  ) {

  }

  function placeSingleChild () {

  }

  function deleteRemainingChildren (
    returnFiber
  ) {
    if (shouldTrackSideEffects) {

    }
  }

  function deleteChild (
    returnFiber,
    child
  ) {
    if (shouldTrackSideEffects) {
      
    }
  }


  return function reconcileChildren (
    returnFiber,
    currentFirstChild,
    newChild
  ) {
    if (!isNull(newChild)) {
      if (newChild.$$typeof) {
        return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild));
      }
    }

    if (isString(newChild) || isNumber(newChild)) {
      return placeSingleChild(reconcileSingleTextElement(returnFiber, currentFirstChild, String(newChild)));
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }

    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }
}