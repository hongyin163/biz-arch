import { ISelectPanelProps } from '../select-panel/types'

export interface ISelectListProps extends ISelectPanelProps {
    /**
     * 支持模式
     * default：默认单选，不显示单选和多选按钮
     * single：单选，显示单选按钮
     * multiple：多选，显示多选按钮
     */
    mode?: 'default' | 'multiple' | 'single';
    /**
     * 是否隐藏输入框，默认 true
     */
    hideInput?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}

export interface ISelectListState {
    visible?: boolean;
}

export interface IOptionProp {
    value: string | number | boolean;
    className?: string,
}
