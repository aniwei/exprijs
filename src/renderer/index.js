import renderIntoContainer from './renderIntoContainer';

export function render (element, container, callback) {
  return renderIntoContainer(
    null,
    element,
    container,
    callback
  );
}

export default render