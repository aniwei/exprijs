import { 
  isNull, 
  isUndefined, 
  isFunction, 
  isString,
  elementTypes
} from './shared';

const { 
  REACT_ELEMENT_TYPE
} = elementTypes;


function ReactElement (
  type, 
  props = {}, 
  key = null,
  ref = null,
  owner = null
) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _owner: owner
  }

  return element;
}

function transformPropsForComponent (props, defaultProps) {
  const newProps = {};

  for (const propName in props) {
    newProps[propName] = props[propName];
  }

  if (defaultProps) {
    for (const propName in defaultProps) {
      if (isUndefined(newProps[propName])) {
        newProps[propName] = defaultProps[propName];
      }
    }
  }

  return newProps;
}

function transformPropsForRealTag (props) {
  const newProps = {};

  for (const propName in props) {
    const propValue = props[propName];

    if (propName === 'defaultValue') {
      newProps.value = props.value || props.defaultValue
    } else {
      newProps[propName] = propValue;
    }
  }

  return newProps;
}

export default function createElement (type, properties, ...children) {
  const props = {};
  const { length } = children;

  if (length > 0) {
    if (length === 1) {
      props.children = children[0];
    } else {
      props.children = children;
    }
  }

  if (!isNull(properties)) {
    if (isFunction(type)) {
      transformPropsForComponent(props, type.defaultProps);
    } else if (isString) {
      transformPropsForRealTag(props);
    }
  }

  return ReactElement(
    type, 
    props
  );
}