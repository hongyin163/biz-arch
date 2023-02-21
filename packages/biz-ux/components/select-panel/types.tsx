type valueType = any[] | string | number | undefined;

export interface ISelectPanelProps {
    /**
     * 默认值
     */
    defaultValue?: valueType;
    /**
     * 为 SelectPanel 赋值
     */
    value?: valueType;
    /**
     * 控制下拉面板显示和隐藏
     */
    visible?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 为容器附加的 style 样式
     */
    style?: React.CSSProperties;
    /**
     * 为面板附加的 style 样式
     */
    panelStyle?: React.CSSProperties;
    /**
     * 为容器附加的 CSS Class
     */
    className?: string,
    /**
     * 组件值为空的占位显示
     */
    placeholder?: string | React.ReactNode;
    /**
     * 下拉面板展开方向，默认是 down
     */
    position?: 'down' | 'up';
    /**
     * 自定义 placeholder 的显示逻辑，默认 value 是 undefined 或者 null 显示 placeholder
     */
    isShowPlaceholder?: (value) => boolean;
    /**
     * 自定义下拉面板的页脚
     */
    footer?: React.ReactNode;
    /**
     * 点击显示框，触发 onFocus 事件
     */
    onFocus?: () => any;
    /**
     * 点击组件之外的区域触发 onClose 事件
     */
    onClose?: () => void;
    /**
     * 自定义值显示区域的格式，包括 placeholder 的逻辑
     */
    renderValue?: (value?: valueType) => React.ReactNode,
    /**
     * 自定义整个显示区域的组件，覆盖 renderValue 的设置
     */
    renderInput?: (value?: valueType) => React.ReactElement,
    /**
     * 自定义弹出面板的所在的容器，默认是 body
     */
    getPopupContainer?: (triggerNode?: Element) => HTMLElement;
}

export interface ISelectPanelState {
    visible: boolean;
}
