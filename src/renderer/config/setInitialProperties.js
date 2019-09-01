
import setInitialDOMProperties from './setInitialDOMProperties';

export default function setInitialProperties (
  element, 
  tag, 
  nextProps, 
  rootContainerInstance
) {
  let props;

  switch (tag) {
    default:
      props = nextProps;
  }

  setInitialDOMProperties(
    tag,
    element,
    rootContainerInstance,
    props
  );
}