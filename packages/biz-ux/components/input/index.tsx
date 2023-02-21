import classNames from 'classnames';
import React, { Component } from 'react';
import { IInputProps } from './types';

/**
 * @visibleName Input 文本输入框
 */
class Input extends Component<IInputProps, any> {
    public static displayName = 'Input'
    public static defaultProps = {
        value: '',
    }
    public state = {}
    public focus() {
        const input = this.refs.input as HTMLInputElement;
        input.focus();
    }
    public blur() {
        const input = this.refs.input as HTMLInputElement;
        input.blur();
    }
    public render() {
        const me = this;
        const {
            type,
            value = '',
            size,
            onPressEnter,
            prefix,
            className,
            ...rest
        } = me.props;
        const cls = classNames('biz-input', {
            [`${className}`]: className,
            'biz-input-lg': size === 'large',
            'biz-input-sm': size === 'small',
        })
        return (
            <input
                {...rest}
                className={cls}
                ref="input"
                value={value}
                type={type}
                onKeyDown={me.handleKeyDown}
            />
        );
    }
    private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const me = this;
        const {
            onPressEnter,
            onKeyDown,
        } = me.props;
        if (onPressEnter && e.keyCode === 13) {
            onPressEnter(e);
        }
        if (onKeyDown) {
            onKeyDown(e)
        }
    }
}

export default Input;
