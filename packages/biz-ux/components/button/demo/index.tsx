import {Button} from 'biz-ux';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../../style/index.less';
import '../style/index.less';

export default class Demo extends Component {
    public render() {
        return (
            <div>
               <Button>测试</Button>
            </div>
        )
    }
}

ReactDOM.render(<Demo/>,document.getElementById('root'))
