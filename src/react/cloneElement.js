import ReactElement from './ReactElement';


export default function cloneElement (element, props, ...children) {

  return ReactElement(
    element.type, 
    key, 
    ref, 
    self, 
    source, 
    owner, 
    props
  );
}