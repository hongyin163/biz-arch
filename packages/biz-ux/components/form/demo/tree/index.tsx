import {
    Button,
    Cascader,
    Input,
    InputTag,
    Radio,
    SelectList,
} from 'biz-ux';
import React, { Component } from 'react';
import Form from '../../index'

const FormItem = Form.Item;
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
const educationData = [
    { key: '20', value: '专科' },
    { key: '25', value: '专科及以上' },
    { key: '30', value: '本科' },
    { key: '35', value: '本科及以上' },
    { key: '40', value: '双学位' },
    { key: '50', value: '硕士研究生' },
    { key: '60', value: 'MBA' },
    { key: '70', value: '博士研究生' },
    { key: '75', value: '博士及以上' },
    { key: '80', value: '博士后及以上' },
    { key: '85', value: '其他' },
    { key: '90', value: '无' },
];

class Demo extends Component<any, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: {
                name: '',
            },
        };
    }
    public onChange = (value) => {
        this.setState({
            value,
        })
    }
    public onSubmit = () => {
        const me = this;
        (me.refs.form as Form).validateFields(async (err, values) => {
            // console.log(err, values)
        })
    }
    public onTagChange = (value) => {
        const me = this;
        me.setState({
            tag: value,
        })
    }
    public clear = () => {
        this.setState({
            value: {},
        })
    }
    public render() {
        const me = this;
        const {
            value,
        } = me.state;
        const formItemLayout = {
            labelCol: 8,
            wrapperCol: 16,
        };
        return (
            <div>

                <Form value={value} onChange={me.onChange} onSubmit={me.onSubmit} >
                    <input data-name="name" type="text" />
                    <Input data-name="school" type="text" />
                    <Form name="children1">
                        <input data-name="name" type="text" />
                        <Input data-name="school" type="text" />
                        <Form name="children2">
                            <input data-name="name" type="text" />
                            <Input data-name="school" type="text" />
                            <Form name="children3">
                                <input data-name="name" type="text" />
                                <Input data-name="school" type="text" />
                            </Form>
                            <Form name="children4">
                                <input data-name="name" type="text" />
                                <Input data-name="school" type="text" />
                            </Form>
                        </Form>
                    </Form>
                </Form>
                <pre>
                    <code>
                        {JSON.stringify(value, null, 4)}
                    </code>
                </pre>
            </div>
        )
    }
}

export default Demo;
