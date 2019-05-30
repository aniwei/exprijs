export function removeFiber(key) {
  key._reactInternalFiber = undefined;
}

export function getFiber(key) {
  return key._reactInternalFiber;
}

export function hasFiber(key) {
  return key._reactInternalFiber !== undefined;
}

export function setFiber(key, value) {
  key._reactInternalFiber = value;
}
