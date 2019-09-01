import React, { Component } from 'react';
import { render } from 'react-dom';
import { document } from 'document';


class App extends Component {
  state = {
    text: 'hello work'
  }

  componentDidMount () {
    setTimeout(() => {
      debugger;
      this.setState({
        text: 'ok!'
      })
    }, 1500)
  }

  render () {
    return <div>{this.state.text}</div>
  }
}


render(
  <App />, 
  document.getElementById('id'), 
  () => {}
);