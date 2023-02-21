import React, { Component } from 'react'
import { IInputProps, IInputState } from './types'

export default class InputBase<IT = {}, S = {}> extends Component<IT & IInputProps, S & IInputState> {

    /**
     * 是否是受控组件
     */
    public isControl() {
        return this.props.hasOwnProperty('value');
    }
    public setValue(value) {
        const me = this;
        const {
            onChange = () => void 0,
        } = me.props;
        return new Promise((resolve) => {
            if (me.isControl()) {
                if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        value = value.map(p => p);
                    } else {
                        value = Object.assign({}, value);
                    }
                }
                onChange(value);
                resolve();
            } else {
                me.setState({
                    value,
                }, () => {
                    onChange(value);
                    resolve();
                })
            }
        })
    }
    public getValue() {
        const me = this;
        const {
            value,
            defaultValue,
        } = me.props;
        if (me.isControl()) {
            const subClass = (me.constructor as React.ComponentClass);
            const {
                defaultProps,
                name,
                displayName,
            } = subClass;

            if (!defaultProps) {
                console.warn(`${displayName || name}:该组件未设置默认属性值，请设置 defaultProps `)
            }
            if (typeof value === 'undefined') {
                return defaultValue;
            }
            return value;
        } else {
            return me.state.value;
        }
    }
}
