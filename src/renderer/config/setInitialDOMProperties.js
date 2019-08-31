import { DANGEROUSLY_SET_INNER_HTML, HTML, CHILDREN, STYLE } from '../../shared'
import { isNullOrUndefined, isString, isFunction } from '../../shared/is';
import ensureListeningTo from '../../event/ensureListeningTo';
import registrationNameModules from '../../event/registrationNameModules';

export default function setInitialDOMProperties (
  tag, 
  element, 
  rootContainerElement, 
  nextProps,
) {
  debugger;
  for (let propName in nextProps) {
    if (!nextProps.hasOwnProperty(propName)) {
      continue;
    }

    const nextProp = nextProps[propName];
    if (propName === STYLE) {
      if (nextProp) {
        Object.freeze(nextProp);
      }
      
      setValueForStyles(element, nextProp);
    } else if (propName === DANGEROUSLY_SET_INNER_HTML) {
      const nextHtml = nextProp ? 
        nextProp[HTML] : 
        undefined;

      if (!isNullOrUndefined(nextHtml)) {
        setInnerHTML(element, nextHtml);
      }
    } else if (propName === CHILDREN) {
      if (isString(nextProp)) {
        const canSetTextContent = tag !== 'textarea' || nextProp !== '';

        if (canSetTextContent) {
          setTextContent(element, nextProp);
        }
      } else if (isNumber(nextProp)) {
        setTextContent(element, String(nextProp));
      }
    } else if (registrationNameModules.hasOwnProperty(propName)) {
      if (isNullOrUndefined(nextProp)) {
        ensureListeningTo(rootContainerElement, propName);
      }
    } else if (isFunction(nextProp)) {
      setValueForProperty(element, propName, nextProp);
    }
  }
}

function setInnerHTML (

  ) {
  
  }
  
  function setValueForStyles (
    element,
    nextProp
  ) {
  
  }
  
  function setTextContent (
    element,
    content
  ) {
    element.innerText = content;
  }
  
  function setValueForProperty (
    element, 
    propName, 
    nextProp
  ) {
  
  }