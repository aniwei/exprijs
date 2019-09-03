import React, { Component } from 'react';
import { render } from 'react-dom';
import { document } from 'document';


class App extends Component {
  state = {
    text: 'hello work'
  }

  count = 0;

  componentDidMount () {
    // setInterval(() => {
    //   const t = new Date();
    //   this.setState({
    //     text: ++this.count
    //   }, () => {
    //     console.log(Date.now() - t);
    //   })
    // }, 1500)
  }

  render () {
    return <div>{this.state.text}</div>
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