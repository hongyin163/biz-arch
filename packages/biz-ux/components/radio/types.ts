import { IBaseButtonProps } from '../button/types';

export interface RadioProps {
    /**
     * 是否选中
     */
    checked?: boolean,
    /**
     * 配合 Group 使用的 Value 属性，不单独使用
     */
    value?: string | number | boolean;
    /**
     * 选中状态改变时触发
     */
    onChange?: (e) => void;
    /**
     * 是否禁用
     */
    disabled?: boolean,
    /**
     * 附加的 CSS Class
     */
    className?: string,
    /**
     * 默认选中状态
     */
    // defaultChecked?: boolean;
}

export interface RadioGroupProps {
    value?: string | number;
    className?: string;
}
