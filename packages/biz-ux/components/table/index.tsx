import classNames from 'classnames';
import React, { Component } from 'react';
import Icon from '../_common/icon';
import Checkbox from '../checkbox';
import Radio from '../radio'
import Scroll from '../scroll';
// import { util } from 'biz-lib';
import { IColumnProps, ITableProps, ITableState, RowKey } from './types';
import { buildCells, getColsDeep, isHaveChildren, setRowSpan } from './util';

/**
 * @visibleName Table 表格
 */
class Table<T> extends Component<ITableProps<T>, any> {
    public static displayName = 'Table'
    public static defaultProps = {
        dataSource: [],
        columns: [],
        scroll: {
            onScroll: () => void 0,
            mode: 'horizontal',
            indicate: {
                width: 10,
                hoverWidth: 10,
                hidden: false,
            },
        },
    }
    public state: ITableState = {
        selectedRowKeys: {},
        hoverRowIndex: -1,
        hoverCellIndex: -1,
    }
    // tableRefs 的 ref 引用 left,right,center
    private tableRefs: { [x: string]: HTMLTableElement } = {};
    constructor(props: ITableProps<T>, context: any) {
        super(props, context);
        const me = this;
        me.state = {
            selectedRowKeys: {},
            hoverRowIndex: -1,
            hoverCellIndex: -1,
        }
        // me.onMouseOverRow = util.debounce(me.onMouseOverRow, 300);
        // me.onMouseOutRow = util.debounce(me.onMouseOutRow, 300);
        me.tableRefs = {};
    }
    public componentDidUpdate() {
        this.resize();
    }
    public resize() {
        const me = this;
        // console.log('componentDidMount')
        const scroll = (me.refs.scroll as Scroll);
        if (!scroll) {
            return;
        }
        scroll.refresh();
    }
    /**
     * 获取选择的key，如果设置了selectedRowKeys，状态通过外部属性控制，
     * 如果没有设置，通过内部state控制
     */
    public getSelectedRowKeys(): object {
        const me = this;
        const {
            rowSelection = {},
        } = me.props;
        if (rowSelection.selectedRowKeys) {
            return (rowSelection.selectedRowKeys as RowKey[]).reduce((pre, current) => {
                return Object.assign(pre, {
                    [current]: true,
                })
            }, {});
        } else {
            return me.state.selectedRowKeys;
        }
    }
    public setSelectedRowKeys(key, selected) {
        const me = this;
        const {
            rowSelection: {
                onChange = () => void 0,
                selectedRowKeys = void 0,
            } = {},
        } = me.props;
        if (selectedRowKeys) {
            // console.log('外部状态')
            const selectKeys = selectedRowKeys as RowKey[];
            let newRowKeys: RowKey[] = [];
            if (selected) {
                newRowKeys = selectKeys.concat([key]);
            } else {
                newRowKeys = selectKeys.filter(p => p !== key);
            }
            const newRecords = me.getRecordsByKeys(newRowKeys);
            onChange(newRowKeys, newRecords);
        } else {
            // console.log('内部状态')
            me.setRowSelected(key, selected)
                .then(() => {
                    const records = me.getSelectedRecord();
                    const keys = me.getKeysByRecords(records);
                    onChange(keys, records);
                });
        }
    }
    public setAllSelectedRowKeys(selected) {
        const me = this;
        const {
            rowSelection: {
                onChange = () => void 0,
                selectedRowKeys = void 0,
            } = {},
            dataSource = [],
        } = me.props;
        if (selectedRowKeys) {
            let newRowKeys: RowKey[] = [];
            let newRecords: any[] = [];
            if (selected) {
                newRowKeys = me.getKeysByRecords(dataSource);
                newRecords = dataSource;
            } else {
                newRowKeys = []
                newRecords = []
            }
            onChange(newRowKeys, newRecords);
        } else {
            me.setAllRowSelected(selected)
                .then(() => {
                    const keys = me.getKeysByRecords(dataSource);
                    onChange(keys, dataSource);
                });
        }
    }
    public getKeysByRecords(records: T[] = []) {
        const me = this;
        return records
            .map((p, i) => me.getRowKey(p, i));
    }
    public getSelectedRecord() {
        const me = this;
        const {
            dataSource = [],
        } = me.props
        const selectedRowKeys = me.getSelectedRowKeys();
        return dataSource
            .filter((p, i) => selectedRowKeys[me.getRowKey(p, i)] === true)
    }
    public getRecordsByKeys(keys: RowKey[] = []): T[] {
        const me = this;
        const {
            dataSource = [],
        } = me.props;
        const map = keys.reduce((pre, key) => {
            return Object.assign(pre, {
                [key]: true,
            })
        }, {});
        return dataSource.filter((p, i) => map[me.getRowKey(p, i)] === true);
    }
    public setRowSelected(key, selected) {
        const me = this;
        return new Promise((resolve, _reject) => {
            me.setState((state) => {
                const selectedRowKeys = state.selectedRowKeys;
                if (!selected) {
                    delete selectedRowKeys[key];
                } else {
                    state.selectedRowKeys[key] = selected;
                }
                state.selectedRowKeys = selectedRowKeys;
                return state;
            }, () => {
                resolve();
            })
        })
    }
    public setAllRowSelected(allSelected: boolean) {
        const me = this;
        const {
            dataSource = [],
        } = me.props

        return new Promise((resolve, _reject) => {
            me.setState((state) => {
                if (allSelected) {
                    state.selectedRowKeys = dataSource
                        .reduce((pre, p, i) => {
                            return Object.assign(pre, {
                                [me.getRowKey(p, i)]: true,
                            })
                        }, {})
                } else {
                    state.selectedRowKeys = {};
                }
                return state;
            }, () => {
                resolve();
            })
        })
    }
    public renderSortTitle = (col: IColumnProps<T>) => {
        let type = 'sort-arrow';
        if (col.sortOrder === 'ascend') {
            type = 'arrow-solid-up';
        } else if (col.sortOrder === 'descend') {
            type = 'arrow-solid-down';
        }
        return (
            <>
                {this.renderTitle(col)}
                <Icon type={type} />
            </>
        )
    }
    public renderTitle = (col: IColumnProps<T>) => {
        let title;
        if (typeof col.title === 'function') {
            title = col.title({ sortOrder: col.sortOrder });
        } else {
            title = col.title;
        }
        return (
            <span>
                {title}
            </span>
        )
    }
    public renderHeader = (columns: Array<IColumnProps<T>>) => {
        const me = this;
        const {
            headerRowHeight = 40,
        } = me.props;
        return columns.map((col) => {
            let thProps: React.ThHTMLAttributes<any> = {};
            if (col.onHeaderCell) {
                thProps = col.onHeaderCell(col) || {};
            }
            if (col.sorter) {
                thProps.className = classNames({ sort: col.sorter }, thProps.className);
            }
            let height: string | number = headerRowHeight;
            if (col.rowSpan) {
                height = col.rowSpan * headerRowHeight;
            }
            const {
                style = {},
                ...restProps
            } = thProps;
            return (
                <th key={col.key}
                    align={col.align || 'left'}
                    colSpan={col.colSpan || 1}
                    rowSpan={col.rowSpan || 1}
                    style={{
                        width: col.width || (col.fixed ? 100 : 'auto'),
                        height,
                        textAlign: col.align,
                        // maxWidth: col.width || (col.fixed ? 100 : 'auto'),
                        // minWidth: col.width || (col.fixed ? 100 : 'auto'),
                        ...style,
                    }}
                    {...restProps}
                >
                    {
                        col.sorter ? me.renderSortTitle(col) : me.renderTitle(col)
                    }
                </th>
            )
        })
    }
    public buildHeaderAndRows = (columns: Array<IColumnProps<T>>) => {
        if (!isHaveChildren(columns)) {
            return {
                headers: [columns],
                rows: columns,
            }
        }

        // 深度优先遍历树，获取树的高度
        // 获取所有的叶子节点，作为列
        const res = getColsDeep(columns);
        const {
            deep,
            cols,
        } = res;
        // 深度优先遍历 设置 RowSpan 和 ColSpan
        setRowSpan(columns, deep, 0);

        // 层序遍历，获取每行的数据
        const lines = [];
        buildCells(columns, lines);

        return {
            headers: lines,
            rows: cols,
        }
    }
    public renderTds = (columns: Array<IColumnProps<T>> = [], record, rowIndex) => {
        const me = this;
        const {
            hoverCellIndex,
            hoverRowIndex,
        } = me.state;
        const rowHover = hoverRowIndex === rowIndex;
        const tds = columns.map((col: IColumnProps<T>, j) => {
            const tdProps = col.onCell ? col.onCell(record, rowIndex) : {};
            const colHover = hoverCellIndex === j;
            const cellHover = rowHover && colHover;
            let value, cellCls;
            const cellState = {
                rowHover,
                colHover,
                cellHover,
            }
            if (col.render) {
                value = col.render(col.dataIndex ? record[col.dataIndex] : '', record, rowIndex, cellState);
            } else if (col.dataIndex) {
                const val = record[col.dataIndex];
                value = typeof val === 'object' ? JSON.stringify(val) : val;
            }
            if (col.cellClassName) {
                cellCls = col.cellClassName('', record, rowIndex, cellState);
            }
            let tdStyle = {};
            tdStyle = {
                width: col.width || (col.fixed ? 100 : 'auto'),
                textAlign: col.align,
                // maxWidth: col.width || (col.fixed ? 100 : 'auto'),
                // minWidth: col.width || (col.fixed ? 100 : 'auto'),
            }
            const fixCls = col.fixed ? 'fixed' : '';
            const tdClass = classNames({ 'biz-table_cell-hover': cellHover && rowHover }, cellCls, fixCls);
            return (
                <td
                    data-index={j}
                    key={col.dataIndex}
                    style={tdStyle}
                    className={tdClass}
                    {...tdProps}
                >
                    {value}
                </td>
            )
        })
        return tds;
    }
    public renderBody = (columns: Array<IColumnProps<T>>, dataSource: T[]) => {
        const me = this;
        const {
            rowClassName,
            onRow,
        } = me.props;

        const {
            hoverRowIndex,
        } = me.state;

        return dataSource.map((record, i) => {
            const tds = me.renderTds(columns, record, i);

            const rowHover = hoverRowIndex === i;
            let rowCls;
            if (rowClassName) {
                rowCls = rowClassName(record, i);
            }
            const rowClass = classNames({ 'biz-table_row-hover': rowHover }, rowCls);
            const trProps = onRow ? onRow(record, i) : {};
            const key = me.getRowKey(record, i);
            return (
                <tr
                    key={key}
                    data-index={i}
                    className={rowClass}
                    {...trProps}
                >
                    {tds}
                </tr>
            )
        })
    }
    public isFixed() {
        const me = this;
        const {
            columns = [],
        } = me.props;
        return columns.some((col) => col.fixed === true);
    }
    public isRowSelection() {
        const me = this;
        const {
            rowSelection,
        } = me.props;
        if (!rowSelection) {
            return false;
        }
        return true;
    }
    public isAllChecked() {
        const me = this;
        // const {
        //     selectedRowKeys = {},
        // } = me.state;
        const selectedRowKeys = me.getSelectedRowKeys();
        const {
            dataSource = [],
            rowKey,
            rowSelection,
        } = me.props;

        if (dataSource.length === 0) {
            return false;
        }

        if (!rowKey || !rowSelection) {
            console.warn('未设置rowKey或rowSelection')
            return false;
        }
        if (Object.keys(selectedRowKeys).length < dataSource.length) {
            return false;
        }
        return dataSource.every((p, i) => selectedRowKeys[me.getRowKey(p, i)])
    }
    public onCheckAll = (e) => {
        const me = this;

        const checked = e.target ? e.target.checked : e;

        me.setAllSelectedRowKeys(checked);
    }
    public onCheckRow = (key, e) => {
        const me = this;

        const checked = e.target ? e.target.checked : e;

        me.setSelectedRowKeys(key, checked);

    }
    public getRowKey = (record: T, i: number) => {
        const me = this;
        const {
            rowKey = '',
        } = me.props;
        if (typeof rowKey === 'function') {
            return rowKey(record, i);
        }
        return record[rowKey];
    }
    public appendSelectionCol(columns) {
        const me = this;
        // const {
        //     selectedRowKeys = {},
        // } = me.state;
        // const {
        //     rowSelection: {
        //         selectedRowKeys = [],
        //     } = {},
        // } = me.props;

        const {
            rowSelection = {},
        } = me.props;
        if (me.isRowSelection()) {
            const {
                columnWidth = 'auto',
                columnTitle = '',
                fixed = false,
                type = 'checkbox',
                getCheckboxProps,
            } = rowSelection;
            const selectAll = me.isAllChecked();
            const selectedRowKeys = me.getSelectedRowKeys();
            // const SelectInput = type === 'checkbox' ? Checkbox : Radio;
            return [{
                fixed: fixed === true ? 'left' : false,
                title() {
                    return (
                        <span>
                            {columnTitle}
                            {
                                type === 'checkbox' ? <Checkbox checked={selectAll} onChange={me.onCheckAll} /> : null
                            }
                        </span>
                    )
                },
                width: columnWidth || 40,
                render(_text: any, record: T, i: number) {
                    const key = me.getRowKey(record, i);
                    let props = {};
                    if (getCheckboxProps) {
                        props = getCheckboxProps(record) || {};
                    }
                    return (
                        <span>
                            {columnTitle}
                            {
                                type === 'checkbox' ?
                                    (
                                        <Checkbox
                                            key={key}
                                            checked={selectedRowKeys[key]}
                                            onChange={me.onCheckRow.bind(me, key)}
                                            {...props}
                                        />
                                    ) : (
                                        <Radio
                                            key={key}
                                            checked={selectedRowKeys[key]}
                                            onChange={me.onCheckRow.bind(me, key)}
                                            {...props}
                                        />
                                    )
                            }
                        </span>
                    )
                },
            }].concat(columns)
        }
        return columns;
    }
    public renderFixedTable(fixed) {
        const me = this;
        const {
            columns = [],
            dataSource = [],
            showHeader = true,
            onHeaderRow,
        } = me.props;
        let cols = columns.filter(p => p.fixed === fixed);
        if (cols.length === 0) {
            return null;
        }

        if (fixed === 'left') {
            cols = me.appendSelectionCol(cols);
        }

        const width = cols.reduce((pre, col) => {
            return pre + Number(col.width || 100);
        }, 0);
        const { headers, rows } = me.buildHeaderAndRows(cols);

        return (
            <table ref={(p) => { me.tableRefs[fixed] = p }} style={{ width }}>
                {
                    showHeader && (
                        <thead>
                            {
                                headers.map((row, i) => {
                                    const trProps = onHeaderRow ? onHeaderRow(row, i) : {};
                                    return (
                                        <tr
                                            {...trProps}
                                        >
                                            {me.renderHeader(row)}
                                        </tr>
                                    )
                                })
                            }
                        </thead>
                    )
                }
                <tbody >
                    {me.renderBody(rows, dataSource)}
                </tbody>
            </table>
        )
    }
    public getRowTr(cell: HTMLElement, currentTarget): { td?: HTMLElement, tr?: HTMLElement } {
        const empty = {
            td: void 0,
            tr: void 0,
        }
        if (cell === currentTarget) {
            return empty;
        }
        if (cell.tagName.toLowerCase() === 'tr') {
            return {
                tr: cell,
                td: void 0,
            };
        }

        let td;
        let parent = cell as HTMLElement;
        while (parent.tagName && parent.tagName.toLowerCase() !== 'tr') {
            // console.log(parent.tagName.toLowerCase());
            if (parent === currentTarget) {
                break;
            }
            if (parent.tagName.toLowerCase() === 'td') {
                td = parent;
            }
            parent = parent.parentNode as HTMLElement;
        }

        return {
            td,
            tr: (parent.tagName && parent.tagName.toLowerCase() === 'tr') ? parent : void 0,
        };
    }
    public onMouseOverRow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const me = this;
        e.stopPropagation();
        // console.log('onMouseOverRow', e.target);
        const { tr, td } = me.getRowTr(e.target as HTMLElement, e.currentTarget);
        // console.log('tr', tr);
        if (!tr || !td) {
            return;
        }
        const trIndex = tr.getAttribute('data-index');
        const tdIndex = td.getAttribute('data-index');
        const hoverRowIndex = Number(trIndex);
        const hoverCellIndex = Number(tdIndex);
        me.setState({
            hoverCellIndex,
            hoverRowIndex,
        })
        // console.log(tr.dataset.index);
    }
    public onMouseOutRow = (_e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const me = this;
        me.setState({
            hoverRowIndex: -1,
            hoverCellIndex: -1,
        })
    }
    public onRowClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        const me = this;
        const {
            dataSource = [],
            onRowClick = () => null,
        } = me.props;
        // console.log('onMouseOverRow', e.target);
        const { tr } = me.getRowTr(e.target as HTMLElement, e.currentTarget);
        if (!tr) {
            return;
        }
        const trIndex = tr.getAttribute('data-index');
        const rowIndex = Number(trIndex);
        onRowClick(dataSource[rowIndex], rowIndex, e);
    }
    public buildFixedColums(columns: Array<IColumnProps<T>> = []) {
        const fixedLeft: Array<IColumnProps<T>> = [];
        const fixedRight: Array<IColumnProps<T>> = [];
        const normal: Array<IColumnProps<T>> = [];
        columns.forEach((col) => {
            if (col.fixed === 'left') {
                fixedLeft.push(col);
            } else if (col.fixed === 'right') {
                fixedRight.push(col);
            } else {
                normal.push(col);
            }
        });
        return fixedLeft.concat(normal).concat(fixedRight);
    }
    public renderTable() {
        const me = this;
        const {
            columns = [],
            dataSource = [],
            showHeader = true,
        } = me.props;
        const cols = me.buildFixedColums(columns);
        const allCols = me.appendSelectionCol(cols);
        const { headers, rows } = me.buildHeaderAndRows(allCols);
        // console.log(headers, rows)
        return (
            <table ref={(p) => { me.tableRefs.center = p; }}>
                {
                    showHeader && (
                        <thead>
                            {
                                headers.map((row) => {
                                    return (
                                        <tr>
                                            {me.renderHeader(row)}
                                        </tr>
                                    )
                                })
                            }
                        </thead>
                    )
                }
                <tbody  >
                    {me.renderBody(rows, dataSource)}
                </tbody>
            </table>
        )

    }
    public getScrollStyle() {
        const me = this;
        const {
            scroll: { x = 'auto', y = 'auto' } = {},
        } = me.props;
        const scrollStyle = {
            width: x,
            height: y,
        };
        return scrollStyle;
    }
    public getScrollProps() {
        const me = this;
        const {
            scroll = {},
        } = me.props;
        const props: { scrollLeft?: number, scrollTop?: number } = {};

        if (scroll.hasOwnProperty('scrollLeft')) {
            props.scrollLeft = scroll.scrollLeft || 0;
        }
        if (scroll.hasOwnProperty('scrollTop')) {
            props.scrollTop = scroll.scrollTop || 0;
        }
        return props;
    }
    public onScroll = (e) => {
        const me = this;
        const {
            scroll: {
                onScroll = () => void 0,
            },
        } = me.props;
        const tableLeft = me.refs.tableLeft as HTMLElement;
        const tableRight = me.refs.tableRight as HTMLElement;
        if (e.target.scrollLeft < -5) {
            tableLeft.style.boxShadow = '3px 0px 4px 0 rgba(45, 45, 45, 0.1)';
        } else {
            tableLeft.style.boxShadow = 'none';
        }
        if (e.target.scrollRight > 5) {
            tableRight.style.boxShadow = 'rgba(45, 45, 45, 0.1) -3px 0px 4px 0px';
        } else {
            tableRight.style.boxShadow = 'none';
        }
        onScroll(e);
    }
    public render() {
        const me = this;
        const {
            className,
            scroll: {
                indicate,
                mode,
                disabled,
            },
            children,
            style,
            disableRowHover,
        } = me.props;
        const scrollStyle = me.getScrollStyle();
        const cls = classNames('biz-table', className)
        const scrollProps = me.getScrollProps();
        const rowHoverEvent = disableRowHover ? {} : { onMouseOverCapture: me.onMouseOverRow, onMouseLeave: me.onMouseOutRow }
        return (
            <div className={cls} style={style}>
                <div
                    className="biz-table_content"
                    onClick={me.onRowClick}
                    {...rowHoverEvent}
                >
                    {
                        disabled && (
                            <div>
                                {me.renderTable()}
                            </div>
                        )
                    }
                    {
                        !disabled && (
                            <Scroll
                                ref="scroll"
                                mode={mode}
                                className="biz-table_scroll"
                                indicate={indicate}
                                height="auto"
                                width="auto"
                                scrollHeight={scrollStyle.height}
                                scrollWidth={scrollStyle.width}
                                onScroll={me.onScroll}
                                {...scrollProps}
                            >
                                {me.renderTable()}
                            </Scroll>
                        )
                    }

                    <div ref="tableLeft" className="biz-table_fixed-left">
                        {me.renderFixedTable('left')}
                    </div>
                    <div ref="tableRight" className="biz-table_fixed-right">
                        {me.renderFixedTable('right')}
                    </div>
                </div>
                {children}
            </div>
        );
    }
}

export default Table;
