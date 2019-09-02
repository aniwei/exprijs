import { isNull, isString, isNumber, isArray, isNullOrUndefined, isFunction } from '../shared/is';
import { createFiberFromElement } from '../reconciler/FiberNode';
import { REACT_FRAGMENT_TYPE } from '../shared/elementTypes';
import { FRAGMENT, HOST_TEXT } from '../shared/workTags';
import { PLACEMENT, DELETION } from '../shared/effectTags';
import { createWorkInProgress, createFiberFromFragment, createFiberFromText } from './FiberNode';

export default function ChildrenReconciler (
  shouldTrackSideEffects
) {

  function reconcileSingleTextElement (
    returnFiber, 
    currentFirstChild,
    textContent
  ) {
    if (!isNullOrUndefined(currentFirstChild) && currentFirstChild.tag === HOST_TEXT) {
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      const existing = useFiber(currentFirstChild, textContent);
      existing.return = returnFiber;
      return existing;
    }
    
    deleteRemainingChildren(returnFiber, currentFirstChild);
    
    const fiber = createFiberFromText(textContent);

    fiber.return = returnFiber;
    return fiber;
  }

  function reconcileSingleElement (
    returnFiber,
    currentFirstChild,
    newChild
  ) {
    const { key, type } = newChild;
    let child = currentFirstChild;

    while (!isNullOrUndefined(child)) {
      if (child.key === key) {
        if (
          child.tag === FRAGMENT ? 
            element.type === REACT_FRAGMENT_TYPE : 
            child.elementType === newChild.type
        ) {
          deleteRemainingChildren(returnFiber, child.sibling);
          const existing = useFiber(
            child, newChild.type === REACT_FRAGMENT_TYPE ? 
              newChild.props.children : 
              newChild.props
          );
          existing.ref = coerceRef(returnFiber, child, newChild);
          existing.return = returnFiber;
          
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }

      child = child.sibling;
    }

    if (type === REACT_FRAGMENT_TYPE) {
      const fiber = createFiberFromFragment(newChild.props.children, element.key);
      created.return = returnFiber;
      return created;
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
    returnFiber,
    currentFirstChild
  ) {
    if (shouldTrackSideEffects) {
      let childToDelete = currentFirstChild;
      while (!isNullOrUndefined(childToDelete)) {
        deleteChild(returnFiber, childToDelete);
        childToDelete = childToDelete.sibling;
      }
      return null;
    }
  }

  function coerceRef(
    returnFiber, 
    current, 
    element
  ) {
    var mixedRef = element.ref;

    if (
      !isNullOrUndefined(mixedRef) && 
      !isFunction(mixedRef) && 
      !isObject(mixedRef)
    ) {
      if (element._owner) {
        const owner = element._owner;
        let instance;
        if (owner) {
          const ownerFiber = owner;

          instance = ownerFiber.stateNode;
        }
        
        const stringRef = String(mixedRef);

        if (
          !isNullOrUndefined(current) && 
          !isNullOrUndefined(current.ref) && 
          isFunction(current.ref) && 
          current.ref._stringRef === stringRef
        ) {
          return current.ref;
        }

        const ref = function (value) {
          let refs = inst.refs;
          if (refs === EMPTY_REFS) {
            refs = inst.refs = {};
          }

          if (isNullOrUndefined(value)) {
            delete refs[stringRef];
          } else {
            refs[stringRef] = value;
          }
        };

        ref._stringRef = stringRef;
        return ref;
      } else {
        // error
      }
    }

    return mixedRef;
  }

  function useFiber(fiber, pendingProps) {
    const clone = createWorkInProgress(fiber, pendingProps);
    
    clone.index = 0;
    clone.sibling = null;
    
    return clone;
  }

  function deleteChild (
    returnFiber,
    child
  ) {
    if (shouldTrackSideEffects) {
      let last = returnFiber.lastEffect;

      if (isNullOrUndefined(last)) {
        last.nextEffect = child;
        returnFiber.lastEffect = child;
      } else {
        returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      }
      child.nextEffect = null;
      child.effectTag = DELETION;
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