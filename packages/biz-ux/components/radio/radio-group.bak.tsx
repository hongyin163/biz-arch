import classnames from 'classnames';
import React, { Component } from 'react';
interface RadioGroupProps {
    value?: string | number;
    className?: string;
    onChange?: (value) => void;
}
export default class RadioGroup extends Component<RadioGroupProps, any>{
    public static displayName = 'RadioGroup'
    public state = {};
    public onChange = (value) => {
        const me = this;
        const {
            onChange,
        } = me.props;
        if (!onChange) {
            return;
        }
        onChange(value);
    }
    public render() {
        const me = this;
        const {
            children,
            className,
            value,
        } = me.props;
        const cls = classnames({
            'radio-group': true,
            'biz-radio-group': true,
            [className]: !!className,
        })

        if (typeof value === 'undefined') {
            return (
                <div className={cls}>
                    {children}
                </div>
            )
        }
        const childs = React.Children.map(children as React.ReactElement[], (child: React.ReactElement) => {
            const props = child.props;
            return React.cloneElement(child, {
                checked: props.value === value,
                onChange: me.onChange.bind(me, props.value),
            })
        })
        return (
            <div className={cls}>
                {childs}
            </div>
        );
    }
}
