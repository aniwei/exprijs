import React, { Component } from '@exprijs';
import ReactDOM from '@exprijs/renderer';
import { document } from '@exprijs/document';




class App extends Component {
    render () {
        return <div>Hello Work</div>
    }
}

ReactDOM.render( <App />, 
    document.getElementById('app'), 
    () => {}
);