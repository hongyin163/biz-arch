import { Cascader } from 'biz-ux';
import React, { Component } from 'react';

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

export default class Demo extends Component<any, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: [],
        }
    }
    public onChange = (value) => {
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
            <div>
                <Cascader
                    value={value}
                    options={options}
                    valueField="value"
                    textField="label"
                    childrenField="children"
                    onChange={me.onChange}
                />
            </div>
        )
    }
}
