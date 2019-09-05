import React, { Component, user } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { document } from 'document';

class Work extends Component {
  static contextTypes = {
    name: PropTypes.string
  }

  render () {
    return <div>
      {this.context.name}
    </div>
  }
}


class App extends Component {
  static childContextTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    className: 'app'
  }

  getChildContext () {
    return {
      name: 'aniwei'
    }
  }

  state = {
    text: 'hello work'
  }

  getRef = () => {
    // debugger;
  }

  render () {
    // debugger;
    return <div className={this.props.className}>
      <Work ref={this.getRef} />
    </div>
  }
}

const t = new Date();
render(
  <App />, 
  document.getElementById('id'), 
  () => {
    console.log('====> render', Date.now() - t);
  }
);