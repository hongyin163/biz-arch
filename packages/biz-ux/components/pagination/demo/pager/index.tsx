import React, { Component } from 'react';
import Pagination from '../../index';
import '../../style';

export default class Demo extends Component<any, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            current: 1,
            total: 1234,
            pageSize: 20,
        }
    }

    public onPageChange = (page, pageSize) => {
        const me = this;
        me.setState({
            current: page,
            pageSize,
        })
    }
    public render() {
        const me = this;
        const {
            current,
            total,
            pageSize,
        } = me.state;
        // console.log(me.state)
        return (
            <div>
                <Pagination
                    current={current}
                    total={total}
                    pageSize={pageSize}
                    onChange={me.onPageChange}
                />
                   <Pagination
                    current={current}
                    total={total}
                    pageSize={pageSize}
                    onChange={me.onPageChange}
                    showQuickJumper={true}
                    showSizeChanger={true}
                />
            </div>
        )
    }
}
