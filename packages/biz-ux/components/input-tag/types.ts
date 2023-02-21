
type valueType = any[];

export interface IInputTagProps {
    /**
     * 输入的值，数组类型
     */
    value: valueType;
    /**
     * 值为空是的占位
     */
    placeholder?: string;
    /**
     * 附加到根元素的 style 样式
     */
    style?: React.CSSProperties;
    /**
     * 附加到根元素的 CSS Class
     */
    className?: string;
    /**
     * 显示内容对应的值字段名称
     */
    valueField: string;
    /**
     * 显示内容的文本字段名称
     */
    textField: string;
    /**
     * 输入框的宽度
     */
    inputWidth?: number;
    /**
     * 是否焦点状态，可以不设置，组件内部维护该状态，如果外部需要更改该状态，可以设置该属性
     */
    focus?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 焦点状态标签是否折行
     */
    isWrap?: boolean;
    /**
     * 是否隐藏输入框
     */
    hideInput?: boolean;
    /**
     * 当 tag 变化时触发
     */
    onChange: (value: valueType) => any;
    /**
     * 输入框内容变化时触发
     */
    onInputChange: (input?: string) => any;
    /**
     * 输入框回车时触发
     */
    onPressEnter?: (input: string) => object;
    /**
     * 输入框焦点时触发
     */
    onFocus?: () => any;
    /**
     * 失去焦点时触发
     */
    onBlur?: () => any;
}

export interface IInputTagState {
    value: any[];
    input?: string;
    isFocus: boolean;
}
