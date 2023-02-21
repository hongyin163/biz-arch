import classnames from 'classnames';
import React, { Component } from 'react';
import Icon from '../_common/icon';
// import Group from './Group';
import RadioButton from './radio-button';
import RadioGroup from './radio-group';
import { RadioProps } from './types';

/**
 * @visibleName Radio 单选组件
 */
class Radio extends Component<RadioProps, any> {
    public static displayName = 'Radio'
    public static RadioGroup: typeof RadioGroup;
    public static Group: typeof RadioGroup;
    public static Button: typeof RadioButton;
    public onCheck = () => {
        const me = this;
        const {
            checked,
            onChange = () => null,
        } = me.props;

        onChange(!checked);
    }
    public render() {
        const me = this;
        const {
            checked,
            disabled,
            className = '',
            children,
        } = this.props;
        const cls = classnames({
            'biz-radio': true,
            'checked': checked,
            'disabled': disabled,
            [className]: !!className,
        })
        const type = checked ? 'checked2' : 'uncheck2';
        return (
            <div className={cls} onClick={me.onCheck}>
                <Icon type={type} />
                {
                    children
                }
            </div >
        );
    }
}

Radio.RadioGroup = RadioGroup;
Radio.Group = RadioGroup;
Radio.Button = RadioButton;

export default Radio;
