
import classNames from 'classnames';
import React, { Component } from 'react'
import Checkbox from '../checkbox';
import Radio from '../radio'
import { ListItemProps } from './types';
export default class ListItem extends Component<ListItemProps> {
    public onItemCheck = (_e: React.MouseEvent) => {
        // e.preventDefault();
        // e.stopPropagation();
        const me = this;
        const {
            value,
            onCheck = () => void 0,
            checked,
        } = me.props;
        onCheck(value, !checked);
    }
    public onItemClick = (e: React.MouseEvent) => {
        const me = this;
        const {
            onClick = () => void 0,
            onCheck = () => void 0,
            value,
            checked,
            checkItemOnClick,
        } = me.props;
        onClick(value, e);
        if(checkItemOnClick){
            onCheck(value, !checked);
        }        
    }
    public renderCheckInput() {
        const me = this;
        const {
            // focus,
            // children,
            // checkBoxVisible,
            // checked,
            mode = 'default',
        } = me.props;
        if (mode === 'default') {
            return null;
        } else if (mode === 'single') {
            return Radio
        } else if (mode === 'multiple') {
            return Checkbox;
        }
    }
    public render() {
        const me = this;
        const {
            focus,
            children,
            // checkBoxVisible,
            checked,
            // mode = 'default',
            disabled,
        } = me.props;
        const cls = classNames('biz-list_item', {
            'focus': focus,
        })
        const Check = me.renderCheckInput() as any;
        return (
            <div className={cls} onClick={me.onItemClick}>
                {/* {
                    checkBoxVisible && <Checkbox onChange={me.onItemCheck} checked={checked} />
                } */}
                {
                    Check && (
                        <Check onChange={me.onItemCheck} checked={checked} disabled={disabled} />
                    )
                }
                {children}
            </div>
        )
    }
}
