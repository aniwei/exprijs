import { COMMENT_NODE } from '../../shared/HTMLNodeType';
import { isNullOrUndefined } from '../../shared/is';

export default function appendChildToContainer (
  container,
  child
) {
  let parentNode;
  if (container.nodeType === COMMENT_NODE) {
    parentNode = container.parentNode;
    parentNode.insertBefore(child, container);
  } else {
    parentNode = container;
    parentNode.appendChild(child);
  }
  
  const reactRootContainer = container._reactRootContainer;

  if (isNullOrUndefined(reactRootContainer) && isNullOrUndefined(parentNode.onclick)) {
    // trapClickOnNonInteractiveElement(parentNode);
  }
}