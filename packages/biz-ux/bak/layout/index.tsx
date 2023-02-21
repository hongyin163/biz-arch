import React, { Component } from 'react';

interface BasicProps {
    readonly className
}

function generator({ prefixCls }) {
    return class Basic extends Component<BasicProps> {
        public static Header: typeof Basic;
        public static Footer: typeof Basic;
        public static Content: typeof Basic;
        public static Side: typeof Basic;
        public render() {
            const {
                className = '',
                children,
                ...rest
            } = this.props;
            return (
                <div className={`${prefixCls} ${className}`} {...rest}>
                    {children}
                </div>
            );
        }
    };
}

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

const Layout = generator({
    prefixCls: 'biz-layout',
});

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Side = Side;

export default Layout;
