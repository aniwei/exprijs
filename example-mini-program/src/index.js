import React, { Component, useState } from 'react';
import ReactDOM from '@renderer';
import { document } from '@document';

const Container = (props) => {
  const [k, setK] = useState('k');


  return <div>
    <span style={{ fontSize: '12px' }}>{props.children} {k} </span>
    <span>1123</span>
  </div>
}


class App extends Component {
  state = {
    text: 'hello world'
  }

  onClick = () => {
    debugger;
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        text: 'aniwei'
      }, () => {
        debugger;
        container;
      })
    }, 1000)
  }

  render () {
    return (
      <Container>{this.state.text}</Container>
    );
  }
}

const container = document.getElementById('app');

ReactDOM.render( <App />, 
  container, 
  () => {
    debugger;
    container;
  }
);