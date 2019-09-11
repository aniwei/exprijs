import { DANGEROUSLY_SET_INNER_HTML, HTML, CHILDREN, STYLE, STYLE_NAME_FLOAT } from '../../shared';
import { isNullOrUndefined, isString, isFunction, isNumber } from '../../shared/is';
import ensureListeningTo from '../../event/ensureListeningTo';
import registrationNameModules from '../../event/registrationNameModules';

import { getProperty } from './properties';

export default function setInitialDOMProperties (
  tag, 
  element, 
  rootContainerElement, 
  nextProps,
) {
  for (let propName in nextProps) {
    if (nextProps.hasOwnProperty(propName)) {
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
      } else if (!isNullOrUndefined(nextProp)) {
        setValueForProperty(element, propName, nextProp);
      }
    }
  }
}

export function setInnerHTML (

) {

}
  
export function setValueForStyles (
  element,
  nextProp
) {
  const style = element.style;

  for (let styleName in styles) {
    if (styles.hasOwnProperty(styleName)) {
      var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);

      if (styleName === STYLE_NAME_FLOAT) {
        styleName = 'cssFloat';
      }
    }

    style[styleName] = styleValue;
  }
}

export function setTextContent (
  element,
  content
) {
  element.innerText = content;
}

export function setValueForProperty (
  element, 
  propName, 
  nextProp
) {
  const property = getProperty(propName);

  if (property) {
    element.setAttribute(property.attributeName, nextProp);
  }

}