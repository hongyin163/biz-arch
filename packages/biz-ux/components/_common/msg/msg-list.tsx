import classNames from 'classnames';
import Animate from 'rc-animate';
import React, { Component } from 'react';
import IconMap from './icon-map';
import MsgItem from './msg-item';
import { MessageListProps } from './types';

interface IMsgItem {
    key, type, message, description, duration, onClose, className,icon
}

export default class MsgList extends Component<MessageListProps, { list: IMsgItem[] }> {
    public seed: number;
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            list: [],
        }
        me.seed = 0;
    }
    public uuid = () => {
        return `biz-msg_msg-${++this.seed}`;
    }
    public add = (item: IMsgItem) => {
        const me = this;
        me.setState((pre) => {
            const { list } = pre;
            item.key = item.key || me.uuid();
            const index = list.findIndex(p => p.key === item.key)
            if (index >= 0) {
                list[index] = item;
                return {
                    list,
                }
            } else {
                return {
                    list: list.concat(item),
                }
            }
        })
    }

    public remove = (key) => {
        const me = this;
        me.setState((pre) => {
            const { list } = pre;
            return {
                list: list.filter(p => p.key !== key),
            }
        })
    }
    public destroy = () => {
        this.setState({
            list: [],
        })
    }
    public render() {
        const me = this;
        const {
            list = [],
        } = me.state;
        const {
            className = '',
            transitionName = 'slide-right',
            style,
        } = me.props;
        const cls = classNames('biz-msg_list', className);
        return (
            <div className={cls} style={style}>
                <Animate transitionName={transitionName}>
                    {
                        list.map((item) => {
                            const icon = item.icon || IconMap[item.type];
                            return (
                                <MsgItem
                                    id={item.key}
                                    key={item.key}
                                    className={item.className || ''}
                                    onClose={() => {
                                        me.remove(item.key);
                                        if (item.onClose) {
                                            item.onClose();
                                        }
                                    }}
                                    type={item.type}
                                    message={item.message}
                                    duration={item.duration}
                                    description={item.description}
                                    icon={icon}
                                />
                            )
                        })
                    }
                </Animate>
            </div>
        )
    }
}
