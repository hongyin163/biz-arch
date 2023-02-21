
export interface IInputProps {
    // 字段中文名称
    label?: string;
    // 字段英文名称
    name?: string;
    // 字段的值
    value?: any;
    // 默认的值
    defaultValue?: any;
    // 值未设置时的默认值
    placeholder?: string;
    onChange?: (value) => any;
}

export interface IInputState {
    // 字段的值
    value?: any;
}
