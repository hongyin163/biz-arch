import React from 'react';

export interface TableStateFilters {
  [key: string]: string[];
}

export type SortOrder = 'descend' | 'ascend';
export type CompareFn<T> = ((a: T, b: T, sortOrder?: SortOrder) => number);
export interface ColumnFilterItem { text: string; value: string; children?: ColumnFilterItem[] }
export type RowKey = string | number;

export interface IColumnProps<T> {
  title?:
  | React.ReactNode
  | ((
    options: {
      filters?: TableStateFilters;
      sortOrder?: SortOrder;
    },
  ) => React.ReactNode);
  key?: React.Key;
  dataIndex?: string;
  /**
   * 自定义单元格显示内容
   */
  render?: (text: any, record: T, index: number, cellState?: { rowHover: boolean, colHover: boolean, cellHover: boolean }) => React.ReactNode;
  /**
   * 自定义单元格 td 标签的 class
   */
  cellClassName?: (text: any, record: T, index: number, cellState?: { rowHover: boolean, cellHover: boolean }) => string;
  /**
   * 内部内容对齐方式
   */
  align?: 'left' | 'right' | 'center';
  /**
   * 是否排序
   */
  sorter?: boolean | CompareFn<T>;
  /**
   * 默认排序模式
   */
  defaultSortOrder?: SortOrder;
  /**
   * 跨列
   */
  colSpan?: number;
  /**
 * 跨行
 */
  rowSpan?: number;
  /**
   * 宽度
   */
  width?: string | number;
  /**
   * className
   */
  className?: string;
  /**
   * 固定列位置
   */
  fixed?: boolean | ('left' | 'right');
  /**
   * 排序顺序
   */
  sortOrder?: SortOrder;
  /**
   * 表头分组
   */
  children?: Array<IColumnProps<T>>;
  /**
   * 单元格点击事件
   */
  onCellClick?: (record: T, event: any) => void;
  /**
   * 表格单元格属性设置
   */
  onCell?: (record: T, rowIndex: number) => any;
  /**
   * 表头单元格属性设置
   */
  onHeaderCell?: (props: IColumnProps<T>) => any;
}

export type RowSelectionType = 'checkbox' | 'radio' | '';
export type SelectionSelectFn<T> = (
  record: T,
  selected: boolean,
  selectedRows: object[],
  nativeEvent: Event,
) => any;

export interface ITableRowSelection<T> {
  /**
   * 设置选择列的组件类型 checkbox 或者 radio
   */
  type?: RowSelectionType;
  /**
   * 表格选中的行的 Key 数组
   */
  selectedRowKeys?: RowKey[];
  /**
   * 选中状态改变时触发 
   */
  onChange?: (selectedRowKeys: RowKey[], selectedRows: T[]) => void;
  /**
   * 设置Checkbox组件的属性
   */
  getCheckboxProps?: (record: T) => object;
  /**
   * 
   */
  // onSelect?: SelectionSelectFn<T>;
  // onSelectMultiple?: (selected: boolean, selectedRows: object[], changeRows: object[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: object[], changeRows: object[]) => void;
  // onSelectInvert?: (selectedRows: object[]) => void;
  // selections?: SelectionItem[] | boolean;
  // hideDefaultSelections?: boolean;
  /**
   * 是否把选择列固定到左边
   */
  fixed?: boolean;
  /**
   * 选择列的宽度
   */
  columnWidth?: string | number;
  /**
   * 选择列的标题
   */
  columnTitle?: string | React.ReactNode;
}
export interface ITableProps<T> {
  /**
   * 行选中配置
   */
  rowSelection?: ITableRowSelection<T>;
  /**
   * 数据源
   */
  dataSource?: T[];
  /**
   * 数据列配置
   */
  columns?: Array<IColumnProps<T>>;
  /**
   * 行 key 值
   */
  rowKey?: string | ((record: T, index: number) => string);
  /**
   * 动态设置行的 ClassName 
   */
  rowClassName?: (record: T, index: number) => string;
  // indentSize?: number;
  /**
   * 行点击时触发
   */
  onRowClick?: (record: T, index: number, event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * 设置表格行属性
   */
  onRow?: (record: T, index: number) => any;
  /**
   * 设置表格头属性
   */
  onHeaderRow?: (columns: Array<IColumnProps<T>>, index: number) => any;
  /**
   * 设置表头的单行的高度，默认是 40px
   */
  headerRowHeight?: number;
  /**
   * 是否显示边框
   */
  bordered?: boolean;
  /**
   * 是否显示头部
   */
  showHeader?: boolean;

  // footer?: (currentPageData: object[]) => React.ReactNode;
  // title?: (currentPageData: object[]) => React.ReactNode;
  /**
   * 滚动条设置
   */
  scroll?: {
    /**
     * 禁用滚动条
     */
    disabled?: boolean;
    /**
     * 表格 x 轴的宽度
     */
    x?: number | 'auto';
    /**
     * 表格 y 轴的高度
     */
    y?: number | 'auto';
    /**
     * 横向滚动条位置设置
     */
    scrollLeft?: number;
    /**
     * 竖向滚动条位置设置
     */
    scrollTop?: number;
    /**
     * 滚动条位置
     */
    mode?: 'horizontal' | 'vertical' | 'both';
    /**
     * 滚动条游标设置
     */
    indicate?: {
      /**
       * 隐藏滚动条
       */
      hidden?: boolean,
      /**
       * 滚动条宽度
       */
      width?: number,
      /**
       * 鼠标滑过后滚动条宽度
       */
      hoverWidth?: number,
    };
    /**
     * 滚动条滚动时设置
     */
    onScroll?: (e) => any;
  };
  /**
   * 禁用鼠标滑过行的 Hover 事件和效果
   */
  disableRowHover?: boolean;
  // childrenColumnName?: string;
  bodyStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface ITableState {
  selectedRowKeys: any;
  hoverRowIndex: number;
  hoverCellIndex: number;
}
