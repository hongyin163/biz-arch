import React from 'react'

export interface PaginationProps {
    /**
     * 记录总数
     */
    total?: number;
    /**
     * 默认当前页码
     */
    // defaultCurrent?: number;
    /**
     * 当前页码
     */
    current?: number;
    /**
     * 默认每个数据行数
     */
    // defaultPageSize?: number;
    /**
     * 每个数据量
     */
    pageSize?: number;
    /**
     * 点击分页时执行, page 是下一页的页码
     */
    onChange?: (page: number, pageSize?: number) => void;
    // hideOnSinglePage?: boolean;
    /**
     * 是否显示页面数据量设置
     */
    showSizeChanger?: boolean;
    /**
     * 每页数量量选择列表设置
     */
    pageSizeOptions?: string[];
    /**
     * 每页数据修改回调
     */
    onShowSizeChange?: (current: number, size: number) => void;
    /**
     * 是否显示快速跳转
     */
    showQuickJumper?: boolean;
    /**
     * 显示全部数据样式
     */
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    // size?: string;
    // simple?: boolean;
    /**
     * 附加的 Style 样式
     */
    style?: React.CSSProperties;
    // locale?: object;
    /**
     * 附加的 CSS Class
     */
    className?: string;
    // prefixCls?: string;
    // selectPrefixCls?: string;
    // itemRender?: (
    //     page: number,
    //     type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    //     originalElement: HTMLElement,
    // ) => React.ReactNode;
    // role?: string;
}

export interface PaginationConfig extends PaginationProps {
    position?: 'top' | 'bottom' | 'both';
}
