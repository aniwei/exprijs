import { DOCUMENT_NODE, DOCUMENT_FRAGMENT_NODE } from '../shared/HTMLNodeType';
import listenTo from './listenTo';

export default function ensureListeningTo(rootContainerElement, registrationName) {
  const isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE || rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
  const doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
  
  listenTo(registrationName, doc);
}