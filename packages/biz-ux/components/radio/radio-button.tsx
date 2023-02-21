import classnames from 'classnames';
import React, { Component } from 'react'
import Button from '../button';
import { IBaseButtonProps } from '../button/types';
import { RadioProps } from './types';
export default class RadioButton extends Component<IBaseButtonProps & RadioProps, any> {
    public static displayName = 'RadioButton'
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
            ...rest
        } = this.props;
        const cls = classnames({
            'biz-radio-button': true,
            'checked': checked,
            'disabled': disabled,
            [className]: !!className,
        })
        return (
            <Button className={cls} onClick={me.onCheck} {...rest}>
                {
                    children
                }
            </Button >
        );
    }
}
