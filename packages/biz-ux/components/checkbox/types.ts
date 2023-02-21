
export interface CheckboxProps {
    /**
     * 兼容 value , onChange 接口，作用和 checked 属性一致
     */
    value?: boolean,
    /**
     * 是否选中
     */
    checked?: boolean,
    /**
     * 是否禁用
     */
    disabled?: boolean,
    /**
     * 附加的 CSS Class
     */
    className?: string,
    /**
     * 选中状态变更事件
     */
    onChange?: (checked: boolean) => void;
}

export interface CheckboxGroupProps {
    value?: Array<string | number>;
    className?: string;
    onChange?: (value) => void;
}
