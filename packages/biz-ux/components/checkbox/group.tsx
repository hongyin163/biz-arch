import classnames from 'classnames';
import React, { Component } from 'react';
import InputBase from '../_common/input-base';
import { CheckboxGroupProps } from './types';

export default class Group extends InputBase<CheckboxGroupProps, any>{
    public static displayName = 'CheckboxGroup'
    public state = {};
    public onChange = (val, checked: boolean) => {
        const me = this;
        const values = me.getValue() || [] as Array<string | number>;
        let resVal;
        if (checked) {
            resVal = values.concat(val)
        } else {
            resVal = values.filter(v => v !== val);
        }
        me.setValue(resVal);
    }
    public render() {
        const me = this;
        const {
            children,
            className,
        } = me.props;
        const cls = classnames({
            'biz-checkbox-group': true,
            [className]: !!className,
        })
        const values = (me.getValue() || []) as Array<string | number>;
        const childs = React.Children.map(children as React.ReactElement[], (child: React.ReactElement) => {
            const props = child.props;
            return React.cloneElement(child, {
                checked: values.indexOf(props.value) >= 0,
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
