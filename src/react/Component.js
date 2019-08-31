import {
  isFunction, 
} from '../shared/is';
import {   
  extend, 
  clone, 
  noop,
  EMPTY_OBJECT 
} from '../shared';

export default class Component {
  constructor (props, context, updater) {
    if (!this.state) {
      this.state = {};
    }
    this.props = props || {};
    this.context = context || EMPTY_OBJECT;
    this.refs = {};
    this.updater = updater;
  }

  setState (state, callback = noop) {
    this.updater.enqueueSetState(this, state, callback);
  }

  getState () {
    const { _pendingStates, state, props } = this
    if (!_pendingStates.length) {
      return state
    }
    const stateClone = clone(state)
    const queue = _pendingStates.concat()
    this._pendingStates.length = 0
    queue.forEach((nextState) => {
      if (isFunction(nextState)) {
        nextState = nextState.call(this, state, props)
      }
      extend(stateClone, nextState)
    })

    return stateClone
  }

  forceUpdate (callback = noop) {
    if (isFunction(callback)) {
      (this._pendingCallbacks = this._pendingCallbacks || []).push(callback)
    }
    updateComponent(this, true)
  }

  render () {
    throw new Error(`React Component render must be implatate`);
  }
}


Component.prototype.isReactComponent = EMPTY_OBJECT;