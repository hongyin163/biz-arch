import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../style/';
import DemoInput from './input';
import SelectDemo from './select';

export default class Demo extends Component {
    public render() {
        return (
            <div
                style={{
                    paddingTop: 500
                }}
            >
                <DemoInput />
                <SelectDemo />
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
