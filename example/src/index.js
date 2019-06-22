import React, { Component } from 'react';
import { render } from 'react-dom';
import { document } from 'document';


class App extends Component {
    render () {
        return <div>Hello work</div>
    }
}

render(
    <App />, 
    document.getElementById('id'), 
    () => {}
);