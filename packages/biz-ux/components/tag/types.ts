import React from 'react';

/**
 * 标签项属性
 */
export interface ITagProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 附加的CSS class 
     */
    className?: string;
    /**
     * 标签颜色
     */
    color?: string;
    /** 
     * 标签是否可以关闭 
     */
    closable?: boolean;
    /**
     * 是否可见
     */
    visible?: boolean;
    /**
     * 是否选中
     */
    checked?: boolean;
    // /**
    //  * 列表序号
    //  */
    // index?: number | string;
    /** 
     * 关闭时的回调 
    */
    onClose?: (p) => void;
    /** 
     * 动画关闭后的回调 
     * */
    afterClose?: () => void;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 点击事件
     */
    onClick?: (p) => void;
    /**
     * 子组件
     */
    children?: {} | React.ReactNode;
}
