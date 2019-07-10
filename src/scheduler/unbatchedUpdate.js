import { isFunction } from '../shared/is';

export default function unbatchedUpdate (callback) {
  if (isFunction(callback)) {
    callback();
  }
}