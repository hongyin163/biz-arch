import React from 'react';

export interface ITagsSplitProps{
    /**
     * TagsSplit容器样式
     */
    style?: React.CSSProperties;
    /**
     * 高度
     */
    height?: number | string,
    /**
     * 左右padding
     */
    padding?: number | string,
    // 数据
    data?: string[]
}
