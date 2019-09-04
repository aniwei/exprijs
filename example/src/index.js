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

  getChildContext () {
    return {
      name: 'aniwei'
    }
  }

  state = {
    text: 'hello work'
  }

  render () {
    return <div>
      <Work />
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