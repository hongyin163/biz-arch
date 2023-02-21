import classnames from 'classnames';
import React, { Component } from 'react';
import Icon from '../_common/icon'
import Group from './group'
import { CheckboxProps } from './types'
/**
 * @visibleName Checkbox 多选组件
 */
class Checkbox extends Component<CheckboxProps, any> {
    public static displayName = 'Checkbox'
    public static Group: any;
    public onCheck = () => {
        const me = this;
        const {
            // value,
            checked,
            disabled,
            onChange = () => null,
        } = me.props;
        if (disabled) {
            return false;
        }
        let isChecked;
        // if (me.props.hasOwnProperty('value')) {
        //     isChecked = value;
        // } else 
        if (me.props.hasOwnProperty('checked')) {
            isChecked = checked;
        }

        onChange(!isChecked);
    }
    public render() {
        const me = this;
        const {
            checked,
            disabled,
            className = '',
            children,
            // ...rest
        } = this.props;
        const cls = classnames({
            'biz-checkbox': true,
            'checked': checked,
            'disabled': disabled,
            [className]: !!className,
        })
        const type = checked ? 'checked1' : 'unchecked1';
        return (
            <div className={cls} onClick={me.onCheck}>
                <Icon type={type} />
                {children}
            </div >
        );
    }
}

Checkbox.Group = Group;

export default Checkbox;
