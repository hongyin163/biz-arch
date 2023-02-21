import { SelectList } from 'biz-ux'
import React, { Component } from 'react';
const Option = SelectList.Option;

export default class Demo extends Component<any, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: '1',
        };
        me.onChange = me.onChange.bind(me);
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
            <div>
                <SelectList
                    disabled={true}
                    value={value}
                    placeholder="学历"
                    panelStyle={{
                        minWidth: 120,
                    }}
                    onChange={me.onChange}
                    style={{
                        margin: '10px 0',
                        width:200,
                    }}
                >
                    <Option value={''}>不限</Option>
                    <Option value={'1'}>大专</Option>
                    <Option value={'2'}>本科</Option>
                    <Option value={'3'}>硕士</Option>
                    <Option value={'4'}>博士</Option>
                </SelectList>
                
                <SelectList
                    disabled={true}
                    mode="single"
                    value={value}
                    placeholder="学历"
                    panelStyle={{
                        minWidth: 120,
                    }}
                    onChange={me.onChange}
                    style={{
                        margin: '10px 0',
                    }}
                >
                    <Option value={''}>不限</Option>
                    <Option value={'1'}>大专</Option>
                    <Option value={'2'}>本科</Option>
                    <Option value={'3'}>硕士</Option>
                    <Option value={'4'}>博士</Option>
                </SelectList>
            </div>
        )
    }
}
