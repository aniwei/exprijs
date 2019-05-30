import { legacyRenderSubtreeIntoContainer } from './renderer';


export function render (
  element, 
  container, 
  callback
) {
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    callback
  );
}