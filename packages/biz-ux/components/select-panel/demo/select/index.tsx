// import { SelectPanel } from 'biz-ux';
import SelectPanel from '../../index';

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import './index.less';

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

export default class Demo extends Component<any, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: '',
            visible: false,
        }
    }
    public onSelect = (value) => {
        this.setState({
            value,
            visible: false,
        })
    }
    public onClose = () => {
        this.setState({
            visible: false,
        })
    }
    public onFocus = () => {
        this.setState({
            visible: true,
        })
    }
    public renderValue = (item) => {
        return `${item.value}(${item.key})`
    }
    public getPopupContainer = () => {
        return findDOMNode(this);
    }
    public render() {
        const me = this;
        const {
            visible,
            value,
        } = me.state;
        return (
            <div style={{
                position: "relative"
            }}>
                <SelectPanel
                    visible={visible}
                    onClose={me.onClose}
                    value={value}
                    placeholder={'请选择'}
                    onFocus={me.onFocus}
                    renderValue={me.renderValue}
                    position="up"
                    style={{
                        width: 200
                    }}
                >
                    <div className="select-panel-demo">
                        <ol>
                            {
                                educationData.map((item) => {
                                    return (
                                        <li onClick={me.onSelect.bind(me, item)}>
                                            {item.value}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                </SelectPanel>               
            </div>
        )
    }
}
