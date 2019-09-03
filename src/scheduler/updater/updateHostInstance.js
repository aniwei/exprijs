import { isNullOrUndefined, isNumber, isString } from '../../shared/is';
import { INPUT, TEXTAREA } from '../../shared/elementTags';
import { STYLE, CHILDREN, DANGEROUSLY_SET_INNER_HTML } from '../../shared';
import { UPDATE } from '../../shared/effectTags';
import registrationNameModules from '../../event/registrationNameModules';

export default function updateHostInstance (
  current,
  workInProgress,
  type,
  nextProps,
  rootContainerInstance 
) {
  const props = current.memoizedProps;
  
  if (props !== nextProps) {
    const instance = workInProgress.stateNode;
    
    const updatePayload = prepareUpdate(instance, type, props, nextProps, rootContainerInstance, null);
    workInProgress.updateQueue = updatePayload;
    workInProgress.effectTag |= UPDATE;
  }
}

function prepareUpdate (
  element, 
  type, 
  props, 
  nextProps, 
  rootContainerInstance, 
  hostContext
) {
  return diffProperties(element, type, props, nextProps, rootContainerInstance);
}

function getInputHostProps (
  elements,
  props
) {
  const node = elements;
  const checked = props.checked;

  return {
    ...props,
    defaultChecked: undefined,
    defaultValue: undefined,
    value: undefined,
    checked: isNullOrUndefined(checked) ? checked : node._wrapperState.initialChecked
  };
}

function getTextAreaHostProps (
  elements,
  props
) {
  const node = elements;

  return {
    ...props,
    value: undefined,
    defaultValue: undefined,
    children: String(node._wrapperState.initialValue)
  };
}

function diffProperties(
  elements, 
  tag, 
  lastRawProps, 
  nextRawProps, 
  rootContainerInstance
) {
  let updatePayload = null;
  let lastProps;
  let nextProps;

  switch (tag) {
    case INPUT: 
      lastProps = getInputHostProps(elements, lastRawProps);
      nextProps = getInputHostProps(elements, nextRawProps);
      updatePayload = [];
      break;
    case TEXTAREA:
      lastProps = getTextAreaHostProps(elements, lastRawProps);
      nextProps = getTextAreaHostProps(elements, nextRawProps);
      updatePayload = [];
      break;
    default:
      lastProps = lastRawProps;
      nextProps = nextRawProps;
      // if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
      //   // TODO: This cast may not be sound for SVG, MathML or custom elements.
      //   trapClickOnNonInteractiveElement(domElement);
      // }
      break;
  }

  let propKey;
  let styleName;
  let styleUpdates = null;
  for (propKey in lastProps) {
    if (
      nextProps.hasOwnProperty(propKey) || 
      !lastProps.hasOwnProperty(propKey) || 
      isNullOrUndefined(lastProps[propKey])
    ) {
      continue;
    }

    if (propKey === STYLE) {
      const lastStyle = lastProps[propKey];

      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          if (!styleUpdates) {
            styleUpdates = {};
          }

          styleUpdates[styleName] = '';
        }
      }
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (!updatePayload) {
        updatePayload = [];
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }

  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = !isNullOrUndefined(lastProps) ? 
      lastProps[propKey] : 
      undefined;

    if (
      !nextProps.hasOwnProperty(propKey) || 
      nextProp === lastProp || 
      isNullOrUndefined(nextProp) && 
      isNullOrUndefined(lastProp)
    ) {
      continue;
    }
    if (propKey === STYLE) {
      if (nextProp) {
        Object.freeze(nextProp);
      }

      if (lastProp) {
        for (styleName in lastProp) {
          if (
            lastProp.hasOwnProperty(styleName) && 
            (!nextProp || !nextProp.hasOwnProperty(styleName))
          ) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = '';
          }
        }
        
        for (styleName in nextProp) {
          if (
            nextProp.hasOwnProperty(styleName) && 
            lastProp[styleName] !== nextProp[styleName]
          ) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = nextProp[styleName];
          }
        }
      } else {
        if (!styleUpdates) {
          if (!updatePayload) {
            updatePayload = [];
          }
          updatePayload.push(propKey, styleUpdates);
        }
        styleUpdates = nextProp;
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      const nextHtml = nextProp ? nextProp[HTML] : undefined;
      const lastHtml = lastProp ? lastProp[HTML] : undefined;

      if (!isNullOrUndefined(nextHtml)) {
        if (lastHtml !== nextHtml) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
        }
      } 
    } else if (propKey === CHILDREN) {
      if (
        lastProp !== nextProp && 
        (isString(nextProp) || isNumber(nextProp))
      ) {
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      }
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (!isNullOrUndefined(nextProp)) {
        ensureListeningTo(rootContainerInstance, propKey);
      }
      if (!updatePayload && lastProp !== nextProp) {
        updatePayload = [];
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }
  if (styleUpdates) {
    (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
  }
  return updatePayload;
}