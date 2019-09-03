import updateDOMProperties from './updateDOMProperties';

export default function updateProperties (
  instance, 
  updateQueue, 
  tag, 
  props, 
  nextProps
) {
  updateDOMProperties(instance, updateQueue)
}