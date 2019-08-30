import { UPDATE_STATE } from '../../shared/updateTags';

export default function createUpdate () {
  return {
    tag: UPDATE_STATE,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  }
}