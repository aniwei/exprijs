import { createContainer } from './fiber';


export function render (type, container, callback) {
  const root = createContainer(container);

  root.render(type);

  return root;
}