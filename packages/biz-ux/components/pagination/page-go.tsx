import React, { Component } from 'react';
import Input from '../input';

export default class PageGo extends Component<any, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            page: '',
        }
    }
    public onChange = (e) => {
        const me = this;
        const value = e.target.value;
        me.setState({
            page: value,
        })
    }
    public onPressEnter = () => {
        const me = this;
        const {
            onChange,
            total = 0, 
            pageSize = 20,
        } = me.props;

        const totalPage = Math.ceil(total / pageSize);
        const value = me.state.page;
        if (isNaN(value)) {
            return;
        }
        if (Number(value) > totalPage) {
            return;
        }
        onChange(Number(value));
    }
    public render() {
        const me = this;
        const {
            page,
        } = me.state;
        return (
            <div className="biz-pagination_go">
                <span>跳至</span><Input value={page} size="small" onChange={me.onChange} onPressEnter={me.onPressEnter} />  <span>页</span>
            </div>
        )
    }
}
