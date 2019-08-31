import { isNull, isString, isNumber, isArray, isNullOrUndefined } from '../shared/is';
import { REACT_FRAGMENT_TYPE } from '../shared/elementTypes';
import { createFiberFromElement } from '../reconciler/FiberNode';
import { PLACEMENT } from '../shared/effectTags';

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
    const { key, type } = newChild;
    const child = currentFirstChild;

    while (!isNullOrUndefined(child)) {
      if (child.key === key) {

      }
    }

    if (type === REACT_FRAGMENT_TYPE) {

    } else {
      const fiber = createFiberFromElement(newChild);
      
      fiber.return = returnFiber;
      return fiber;
    }
  }

  function placeSingleChild (fiber) {
    if (shouldTrackSideEffects && isNullOrUndefined(fiber.alternate)) {
      fiber.effectTag |= PLACEMENT;
    }

    return fiber;
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