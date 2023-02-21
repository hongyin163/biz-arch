/**
 * 组件开发调试入口
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Demo1 from './demo1'
export default class Demo extends Component {
    public render() {
        return (
            <div>
                <Demo1 />
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
