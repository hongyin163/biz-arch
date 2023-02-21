
import classNames from 'classnames';
import React, { Component } from 'react';
import './style';

export interface IconProps {
    type?: string;
    className?: string;
    title?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    spin?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
}
/**
 * @visibleName Icon 图标
 */
class Icon extends Component<IconProps, any> {
    public static displayName = 'Icon'
    public state = {}
    static config: ({ css, fontClass, fontPrefix }: any) => void;
    public render() {
        const {
            prefixCls = 'bizicon',
            className,
            type,
            ...rest
        } = this.props;
        const cls = classNames(prefixCls, ` ${prefixCls}-${type}`, className);
        return (
            <i className={cls} {...rest}></i>
        );
    }
}


export default Icon;
