import classnames from 'classnames';
import React, { Component } from 'react';
import { ITagProps } from './types';

class CheckTag extends Component<ITagProps, any> {
    public handleCheckTags = () => {
        const me = this;
        const {
            onClick,
        } = me.props;
        if (!onClick) {
            return;
        }
        const param = me.getParams();
        onClick(param);
    }
    public getParams() {
        const me = this;
        let params = {};
        const {
            children,
        } = me.props;
        params = {
            children,
        };
        return params;
    }
    public render() {
        const me = this;
        const {
            checked,
            children,
        } = me.props;
        const prefixCls = 'biz-check';
        const cls = classnames(
            prefixCls,
            {
                [`${prefixCls}_checked`]: checked,
            },
        )
        return (
            <div
                className={cls}
                onClick={() => me.handleCheckTags()}
            >
                {children}
            </div>
        )
    }
}

export default CheckTag;
