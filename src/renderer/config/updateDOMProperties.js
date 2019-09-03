import { DANGEROUSLY_SET_INNER_HTML, HTML, CHILDREN, STYLE, STYLE_NAME_FLOAT } from '../../shared'
import { 
  setValueForStyles,
  setInnerHTML,
  setTextContent,
  setValueForProperty
} from './setDOMProperties';

export default function updateDOMProperties (
  element,
  updateQueue
) {
  for (var i = 0; i < updateQueue.length; i += 2) {
    const propKey = updateQueue[i];
    const propValue = updateQueue[i + 1];

    if (propKey === STYLE) {
      setValueForStyles(element, propValue);
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      setInnerHTML(element, propValue);
    } else if (propKey === CHILDREN) {
      setTextContent(element, propValue);
    } else {
      setValueForProperty(element, propKey, propValue, isCustomComponentTag);
    }
  }
}