
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../../style/index.less';
import '../style/index.less';
import Photo from './photo'
export default class Demo extends Component {
    public render() {
        return (
            <div>
                <Photo/>
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
