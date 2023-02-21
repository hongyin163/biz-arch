import React, { Component } from 'react';
import { generator } from './basic';

const Header = generator({
    prefixCls: 'biz-layout_header',
});

const Footer = generator({
    prefixCls: 'biz-layout_footer',
});

const Content = generator({
    prefixCls: 'biz-layout_content',
});

const Side = generator({
    prefixCls: 'biz-layout_side',
});

/**
 * @visibleName Layout 布局
 */
class Layout extends Component<any, any> {
    public static Header: any;
    public static Footer: any;
    public static Content: any;
    public static Side: any;
    public static displayName: string;
    public render() {
        const {
            className = '',
            children,
            ...rest
        } = this.props;
        return (
            <div className={`biz-layout ${className}`} {...rest}>
                {children}
            </div>
        );
    }
}

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Side = Side;
Layout.displayName = 'Layout';

export default Layout;
