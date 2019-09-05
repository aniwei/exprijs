import ReactElement from './ReactElement';

export default function createElement (
  type, 
  props, 
  ...children
) {
  const { length } = children;

  if (length > 0) {
    if (length === 1) {
      children = children[0];
    }
  }

  return ReactElement(
    type, 
    { ...props, children }
  );
}