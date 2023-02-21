import classnames from 'classnames';
import React from 'react';
import InputBase from '../_common/input-base';
import {RadioGroupProps} from './types';

export default class Group extends InputBase<RadioGroupProps, any>{
    public static displayName = 'RadioGroup'
    public state = {};
    public onChange = (value) => {
        const me = this;
        me.setValue(value);
    }
    public render() {
        const me = this;
        const {
            children,
            className,            
        } = me.props;
        const cls = classnames({
            'radio-group': true,
            'biz-radio-group': true,
            [className]: !!className,
        });
        
        if(!me.isControl()){
            return (
                <div className={cls}>
                    {children}
                </div>
            )
        }

        const value =  me.getValue();

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
