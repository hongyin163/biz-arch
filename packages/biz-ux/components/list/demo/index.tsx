import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../style/';

import SingleDemo from './single';

export default class Demo extends Component {
    public render() {
        return (
            <div>
                <SingleDemo />
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
