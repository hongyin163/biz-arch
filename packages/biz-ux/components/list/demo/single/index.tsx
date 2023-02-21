import React, { Component } from 'react';
import { List } from 'biz-ux';

export default class Demo extends Component<any, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            data: [
                '苹果',
                '西瓜',
                '西红柿'
            ],
            value: [],
        };
        me.onListSelect = me.onListSelect.bind(me);
    }
    onListSelect(value) {

        this.setState({
            value,
        })
    }
    render() {
        const me = this;
        const {
            data,
            value,
        } = me.state;
        return (
            <>
                <List style={{ width: 200 }} value={value} onChange={me.onListSelect} >
                    {
                        data.map((item, i) => {
                            return (
                                <List.Item value={i}>
                                    {item}
                                </List.Item>
                            )
                        })
                    }
                </List>
                <p>
                    value：{JSON.stringify(value)}
                </p>
            </>
        )
    }
}
