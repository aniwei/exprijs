
import setDOMProperties from './setDOMProperties';

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

  setDOMProperties(
    tag,
    element,
    rootContainerInstance,
    props
  );
}