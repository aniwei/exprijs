const properties = {
};



[
  ['className', 'class']
].forEach(([propertyName, attributeName]) => {
  properties[propertyName] = createProperty(propertyName, null, attributeName);
});

function createProperty (propertyName, type, attributeName) {
  return {
    type,
    propertyName,
    attributeName
  }
}

export function getProperty (name) {
  return properties[name]; 
}