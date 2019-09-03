import React, { Component } from 'react';
import { render } from 'react-dom';
import { document } from 'document';

const Work = () => {
  return (
    <div className="one">
      worker
    </div>
  );
}


class App extends Component {
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