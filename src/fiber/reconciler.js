import { isNullOrUndefined, isNull } from '../shared';

export function reconcileChildren () {

}

export function replaceSingleChild () {}

export function reconcileSingleElement (returnFiber, currentFirstFiber, element) {
  const { key, type } = element;
  const child = currentFirstFiber;

  while (!isNull(child)) {
    if (child.key === key) {
        
    } else {
      deleteChild(returnFiber, child);
    }

    child = child.sibling;
  }

  if (type === REACT_FRAGMENT_TYPE) {
    const created = createFiberFromFragment();
    
    created.return = returnFiber;
    
    return created;
  } else {
    const created = createFiberFromElement(element, returnFiber.mode);

    created.ref = coerceRef(returnFiber, currentFirstFiber, element);
    created.return = returnFiber;

    return created;
  }
}

function deleteChild () {

}