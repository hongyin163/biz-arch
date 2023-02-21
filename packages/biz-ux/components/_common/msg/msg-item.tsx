import classNames from 'classnames';
import React, { Component } from 'react';
import Icon from '../icon';
import { IMessageItemProps } from './types';

export default class MsgItem extends Component<IMessageItemProps, any> {
    public componentDidMount() {
        this.setCloseTimeout();
    }
    public setCloseTimeout() {
        const me = this;
        const {
            duration = 3,
            onClose,
        } = me.props;
        if (duration === 0) {
            return;
        }
        const timer = setTimeout(() => {
            if (onClose) {
                onClose();
            }
            clearTimeout(timer);
        }, duration * 1000)
    }
    public onItemClose = () => {
        const me = this;
        const {
            onClose,
        } = me.props;
        if (onClose) {
            onClose();
        }
    }
    public render() {
        const me = this;
        const {
            message,
            description,
            type,
            icon,
            id,
            className = '',
        } = me.props;
        const contentCls = classNames('biz-msg_content', type);
        const itemCls = classNames('biz-msg_item', className);
        return (
            <div id={id} className={itemCls}>
                <div className="biz-msg_close" onClick={me.onItemClose}>
                    <Icon type="close" />
                </div>
                <div className={contentCls}>
                    <div className="biz-msg_item-icon">
                        {icon ? icon : (
                            <Icon type={type} />
                        )}
                    </div>
                    <div className="biz-msg_item-body">
                        <div className="biz-msg_item-message">
                            {message}
                        </div>
                        <div className="biz-msg_item-content" >
                            {description}
                        </div>
                    </div>
                </div>
                <div className="biz-msg_arrow">
                </div>
            </div>
        )
    }
}
