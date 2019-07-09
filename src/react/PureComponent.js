import Component from './Component';
import { shallowEqual } from '../shared';

class PureComponent extends Component {
  isPureComponent = true;

  constructor (props, context) {
    super(props, context);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
}

export default PureComponent;