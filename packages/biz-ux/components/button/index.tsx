import classNames from 'classnames';
import React, { Component } from 'react';
import { IBaseButtonProps } from './types'

export { IBaseButtonProps, ButtonType } from './types';

/**
 * @visibleName Button 按钮
 */
class Button extends Component<IBaseButtonProps, any>{
    public static displayName = 'Button'
    public static defaultProps: IBaseButtonProps = {
        type: 'primary',
        htmlType: 'button',
        size: 'default',
        disabled: false,
    }
    public handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {
            onClick,
        } = this.props;
        if (onClick) {
            onClick(event);
        }
    }
    public render() {
        const {
            style,
            children,
            type = '',
            className = '',
            disabled = false,
            size = 'default',
            htmlType = 'button',
            ...rest
        } = this.props;

        const cls = classNames(
            'biz-button',
            {
                [`biz-button_${type}`]: type,
                ['biz-button_disable']: disabled,
            },
            `${size}`,
            className,
        )
        return (
            <button
                role="button"
                disabled={disabled}
                className={cls}
                style={style}
                type={htmlType}
                onClick={this.handleClick}
                {...rest}
            >
                {children}
            </button>
        );
    }
}

export default Button;
