import scheduleUpdate from '../scheduler/scheduleUpdate';

export default class Component {
  constructor(props) {
    this.props = props;
    this.context = context;
    this.state = this.state || {};
  }

  setState (partialState, callback) {
    scheduleUpdate(this, partialState, callback);
  }

  forceUpdate (callback) {

  }
}

