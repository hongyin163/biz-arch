
import classNames from 'classnames';
import React, { Component } from 'react';

const __CONFIG = {
    fontFamily: ''
}
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
    static config: ({ css, fontFamily }: any) => void;
    public render() {
        const {
            prefixCls = __CONFIG.fontFamily || 'biz-icon',
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

Icon.config = function ({ css, fontFamily }) {
    __CONFIG.fontFamily = fontFamily;

    if (typeof document === 'undefined') {
        return;
    }

    if (!css) {
        return;
    }
    
    const link = document.createElement('link');
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", css);
    document.head.appendChild(link);
}

export default Icon;
