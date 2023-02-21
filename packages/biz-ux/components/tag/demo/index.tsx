import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import Tag from '../index';
import '../style/index';
import './index.less';

export default class TagDemo extends Component {
    public render() {
        return (
            <>
                <Tag >你好</Tag>
                <Tag checked={true}>你好</Tag>
                <Tag className="tag_demo">你好</Tag>
            </>
        )
    }
}

ReactDOM.render(<TagDemo/>,document.querySelector('#root'));
