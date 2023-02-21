import { Button } from 'biz-ux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import message from '../index';
import '../style';

export default class Demo extends Component {
    public onClick(type) {
        message[type](`This is ${type} message`, 0);
    }
    public render() {
        const me = this;
        return (
            <div>
                <div>
                    <Button>测试</Button>
                </div>
                <div style={{ paddingTop: 300 }}>
                    {
                        ['success', 'info', 'warning', 'error', 'loading'].map((type) => {
                            return (
                                <Button onClick={me.onClick.bind(me, type)}>{type}</Button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
