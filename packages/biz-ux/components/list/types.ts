import React from 'react';

type ListMode = 'default' | 'multiple' | 'single';

export interface ListProps {
    /**
     * 列表模式，包括  'default' | 'multiple' | 'single' 三种
     * default 没有单选和多选按钮，单击选择列表项
     * multiple 多选，显示 Checkbox 组件
     * single 单选，显示 Radio 组件     *
     */
    mode?: ListMode;
    /**
     * 列表标题
     */
    title?: string;
    /**
     * 列表的选中的值，单选和多选都是数组类型
     * ListItem的value
     */
    value?: any[];
    /**
     * 类别默认的选中值
     */
    defaultValue?: any[];
    /**
     * 列表选中项变化时触发，values 为选中的值数组
     */
    onChange?: (values: any[]) => void;
    /**
     * 当列表项点击时触发
     */
    onItemClick?: (value: any, event: Event) => void;
    /**
     * 当列表项选中是触发
     */
    onItemCheck?: (value: any, checked: boolean) => void;
    /**
     * 当点击行时，选中该项目，默认是 false
     */
    checkItemOnClick?: boolean;
    /**
     * 为列表附加的 CSS Class
     */
    className?: string;
    /**
     * 列表的 style 样式
     */
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /**
     * 不可操作的选型
     */
    disabledValue?: Array<{ value: any, checked: boolean }>;
}

export interface ListItemProps {
    value: any;
    checked?: boolean;
    focus?: boolean;
    mode: ListMode;
    checkBoxVisible?: boolean;
    onCheck?: (records: any, checked: boolean) => void;
    onClick?: (record: any, event: React.MouseEvent) => void;
    children?: React.ReactNode;
    disabled?: boolean;
    checkItemOnClick?: boolean;
}

export interface ItemProps {
    value?: any;
    children?: React.ReactNode;
}
