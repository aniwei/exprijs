import { DANGEROUSLY_SET_INNER_HTML, HTML, CHILDREN, STYLE, STYLE_NAME_FLOAT } from '../../shared'
import { isNullOrUndefined, isString, isFunction } from '../../shared/is';
import ensureListeningTo from '../../event/ensureListeningTo';
import registrationNameModules from '../../event/registrationNameModules';

export default function setInitialDOMProperties (
  tag, 
  element, 
  rootContainerElement, 
  nextProps,
) {
  for (let propName in nextProps) {
    if (nextProps.hasOwnProperty(propName)) {
      const nextProp = nextProps[propName];

      if (registrationNameModules.hasOwnProperty(propName)) {
        if (isNullOrUndefined(nextProp)) {
          ensureListeningTo(rootContainerElement, propName);
        }
      } else if (isFunction(nextProp)) {
        setValueForProperty(element, propName, nextProp);
      }  else {
        switch (propName) {
          case STYLE: {
            if (nextProp) {
              Object.freeze(nextProp);
            }
  
            setValueForStyles(element, nextProp);
            break;
          }
  
          case DANGEROUSLY_SET_INNER_HTML: {
            const nextHtml = nextProp ? 
              nextProp[HTML] : 
              undefined;
  
            if (!isNullOrUndefined(nextHtml)) {
              setInnerHTML(element, nextHtml);
            }
  
            break;
          }
  
          case CHILDREN: {
            if (isString(nextProp)) {
              const canSetTextContent = tag !== 'textarea' || nextProp !== '';
      
              if (canSetTextContent) {
                setTextContent(element, nextProp);
              }
            } else if (isNumber(nextProp)) {
              setTextContent(element, String(nextProp));
            }
          }
        }
      } 
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