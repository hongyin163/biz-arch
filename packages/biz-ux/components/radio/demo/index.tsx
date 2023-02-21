
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Radio from '../index';
import '../style';

class Demo extends Component<any, any>{
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = { value: 0 };
    }
    public onChange(value) {
        this.setState({
            value,
        })
    }
    public render() {
        const me = this;
        const {
            value,
        } = me.state;
        return (
            <div style={{ padding: 10 }}>
                <Radio.Group value={value} onChange={me.onChange.bind(me)}>
                    <Radio.Button value={0}>苹果</Radio.Button>
                    <Radio.Button value={1}>西瓜</Radio.Button>
                    <Radio.Button value={2}>葡萄</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
