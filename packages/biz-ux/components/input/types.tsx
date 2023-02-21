import React from 'react';
import { Omit } from '../_util/type';

export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * 文本框大小
     */
    size?: 'large' | 'default' | 'small';
    /**
     * 按回车键触发
     */
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    /**
     * 按钮大小
     */
    value?: string;
}
