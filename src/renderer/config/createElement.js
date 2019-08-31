import { DOCUMENT_NODE } from '../../shared/HTMLNodeType';
import { isString } from '../../shared/is';

function getOwnerDocumentFromRootContainer (
  rootContainerElement
) {
  return rootContainerElement.nodeType === DOCUMENT_NODE ? 
    rootContainerElement : 
    rootContainerElement.ownerDocument;
}

export default function createElement (
  type, 
  props, 
  rootContainerElement
) {
  const ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
  let element;

  if (isString(props.is)) {
    element = ownerDocument.createElemeent(type, { is: props.is });
  } else {
    element = ownerDocument.createElemeent(type);
  }

  return element;
}