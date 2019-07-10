import { createDomElement } from './dom';
import reconcileChildrenArray from '../reconciler/reconcileChildrenArray';

export default function updateHostComponent (wipFiber) {
  if (!wipFiber.stateNode) {
      wipFiber.stateNode = createDomElement(wipFiber);
  }

  const newChildElements = wipFiber.props.children;
  reconcileChildrenArray(wipFiber, newChildElements);
}