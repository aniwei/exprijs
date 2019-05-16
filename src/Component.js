

export default class Component {
  constructor (props, context, updater) {
    this.props = props;
    this.context = context;
    this.updater = updater;
    
    this.refs = {};
  }
}

Component.prototype.isReactComponent = true;