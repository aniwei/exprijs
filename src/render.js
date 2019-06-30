import { legacyRenderIntoContainer }  from './renderer';


export function render (
  element, 
  container, 
  callback
) {
  return legacyRenderIntoContainer(
    null,
    element,
    container,
    callback
  );
}