export interface IvCalendarProps {
    /**
     * 每个单元格追加dom 
     */
    dateCellRender?: (n) => HTMLElement;
    /**
    /**
     * 数据源
     */
    dataSource?: object,
    /**
     *  日期面板变化回调
     */
    onChange?: (n, m) => void,
    /**
     * 日历类型
     *
     */
    // type
    /**
     * 为日历附加 className
     */
    className?: string;
}
