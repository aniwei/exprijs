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
      fiber.return = returnFiber;
      return fiber;
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

  function reconcileChildrenArray (
    returnFiber, 
    currentFirstChild, 
    newChildren
  ) {
    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
        if (_newFiber === null) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }
        previousNewFiber = _newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
      if (_newFiber2 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber2.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }
        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }


  return function reconcileChildren (
    returnFiber,
    currentFirstChild,
    newChild
  ) {
    if (!isNull(newChild)) {
      if (newChild.$$typeof) {
        return placeSingleChild(
          reconcileSingleElement(returnFiber, currentFirstChild, newChild)
        );
      }
    }

    if (isString(newChild) || isNumber(newChild)) {
      return placeSingleChild(
        reconcileSingleTextElement(returnFiber, currentFirstChild, String(newChild))
      );
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }

    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }
}