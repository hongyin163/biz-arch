import classnames from 'classnames';
import React, { Component } from 'react';
import Icon from '../_common/icon';
import CheckTag from './CheckTag';
import { ITagProps } from './types';

/**
 * @visibleName Tag 标签
 */
class Tag extends Component<ITagProps, any> {
    public static CheckTag = CheckTag;
    public onTagClick = (e: MouseEvent) => {
        e.stopPropagation();
        const me = this;
        let params = {};
        const {
            onClick = () => null,
        } = me.props;
        params = me.getParams();
        onClick(params);
    }
    public onRemove = (e: MouseEvent) => {
        e.stopPropagation();
        const me = this;
        let params = {};
        const {
            onClose = () => null,
        } = me.props;
        params = me.getParams();
        onClose(params);
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
    public renderCloseIcon() {
        const { closable } = this.props;
        return closable ? (
            <div className="close" onClick={this.onRemove.bind(this)}>
                <Icon type="close" />
            </div>
        ) : null
    }
    public render() {
        const me = this;
        const {
            children,
            checked,
            style,
            closable,
            className,
        } = me.props;
        const prefixCls = 'biz-tag';
        const cls = classnames(
            prefixCls,
            {
                [`${prefixCls}_checked`]: checked,
                [`${prefixCls}_closable`]: closable,
            },
            className,
        );
        return (
            <div
                className={cls}
                onClick={me.onTagClick.bind(me)}
                style={style}
            >
                <span>{children}</span>
                {me.renderCloseIcon()}
            </div>
        )
    }
}

export default Tag;
