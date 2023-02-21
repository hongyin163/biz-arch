import React from 'react';

// type any = string | number | undefined | null;
type ListCascaderMode = 'default' | 'multiple' | 'single';

/**
 * 级联列表
 */
export interface IListCascaderProps {
    /**
     * 列表的数据，数据是 json 树形数据
     */
    options?: any[];
    /**
     * 列表项显示的文本字段，默认是 text 
     */
    textField: string;
    /**
     * 列表项显示的值字段，默认是 value
     */
    valueField: string;
    /**
     * 子级列表对应的的字段，默认是 children
     */
    childrenField: string;
    /**
     * 级联列表对应的值，对应每列选择的值
     */
    value?: Array<string | number>;
    /**
     * 默认值
     */
    defaultValue?: any[];
    /**
     * 显示层级 默认 10
     */
    maxLevel: number;
    /**
     * 级联列表选择的数据改变时触发
     * mode = single 时，返回每列选中项的数组
     * mode = multiple 时，返回多选框选中的想的数组
     */
    onChange?: (values: Array<string | number>) => void;
    /**
     * 当点击列表项时触发
     */
    onItemClick?: (value: any, event?: Event) => void;
    /**
     * 当列表是多选，点选了 Radio 或者 CheckBox 时触发
     */
    onItemCheck?: (value: any[], checked: boolean) => void;
    /**
     * 附加的 CSS Class
     */
    className?: string;
    /**
     * 附加的 style 样式
     */
    style?: React.CSSProperties;
    /**
     * 设置组件是否多选，影响 onChange 返回的 value 值
     * single : 默认，返回每个每列选中项的数组
     * multiple：仅返回每列多选框选中项的结果数组
     */
    mode: 'multiple' | 'single';
    /**
     * 设置每列是否单选，多选，
     * 可以是数组：['default','multiple','single']
     * 也可以是函数，根据每列数据确定是单选还是多选
     * default：不显示单选框和多选框
     * single：显示单选框
     * multiple：显示多选框
     */
    listItemModes?: ListCascaderMode[] | ((record: any, column: number) => ListCascaderMode);
    /**
     * 设置每列的标题，显示在列表数据的上方
     */
    listItemTitles?: string[] | ((record: any, column: number) => string);
}

export interface IListCascaderState {
    options: any[];
    select: any[];
    checked: any;
    columns: any[];
}
