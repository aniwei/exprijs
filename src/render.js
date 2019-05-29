import { legacyRenderSubtreeIntoContainer } from './renderer';


export function render (
  element, 
  container, 
  callback
) {
  legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    callback
  );
}