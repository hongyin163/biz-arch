import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../style/';
import DisableDemo from './disable';
import MultiDemo from './multi';
import SingleDemo from './single';

export default class Demo extends Component {
    public render() {
        return (
            <div style={{padding:'80px'}}>
                <SingleDemo />
                <br/>
                <MultiDemo />
                <br/>
                <DisableDemo />
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
