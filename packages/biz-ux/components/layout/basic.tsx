import React, { Component } from 'react';

interface BasicProps {
    readonly className
}

export  function generator({ prefixCls }) {
    return class Basic extends Component<BasicProps> {
        public static Header: typeof Basic;
        public static Footer: typeof Basic;
        public static Content: typeof Basic;
        public static Side: typeof Basic;
        public static displayName = 'Layout';
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
