import classnames from 'classnames';
import React, { Component } from 'react'
import { SwitchProps } from './types';

export default class Switch extends Component<SwitchProps,any> {
    public state = {
        innerChecked:false,
    }
    public handleChange = (e)=>{
        const me = this;
        const {
            onChange = (check: boolean,event: React.MouseEvent) => null,
            checked,
        } = me.props;
        const {
            innerChecked,
        } = me.state;

        if('checked' in me.props && 'onChange' in me.props ){ // 控制权交给受控方式
            onChange(!checked,e);
            return ;
        }

        me.setState({
            innerChecked: !innerChecked,
        });
    }
    public render() {
        const me = this;
        const {
            checked,
            defaultChecked,
            checkedChildren,
            unCheckedChildren,
        } = me.props;
        const {
            innerChecked,
        } = me.state;

        const check = checked || defaultChecked || innerChecked;

        const classNames = classnames('biz-switch',{ 'biz-switch-checked': check });
        return (
            <div className={classNames} onClick={me.handleChange}>
                <div className="biz-switch-handle"></div>
                <div className="biz-switch-inner">
                    {
                        check? checkedChildren : unCheckedChildren
                    }
                </div>
            </div>
        )
    }
}
