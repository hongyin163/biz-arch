import React, { Component } from 'react';
import { ColumnProps, TableProps } from './interface';

class Table<T> extends Component<TableProps<T>, any> {
    public state = {}
    public renderHeader = (columns: Array<ColumnProps<T>>) => {
        return columns.map((col) => {
            return (
                <th key={col.key} align={col.align || 'center'} colSpan={col.colSpan || 1}>
                    {col.title}
                </th>
            )
        })
    }
    public renderBody = (columns: Array<ColumnProps<T>>, dataSource: T[]) => {
        return dataSource.map((item, i) => {
            const tds = columns.map((col) => {
                return (
                    <td key={col.dataIndex}>
                        {col.dataIndex && item[col.dataIndex]}
                        {col.render && col.render('', item, i)}
                    </td>
                )
            })
            return (
                <tr>{tds}</tr>
            )
        })
    }
    // tslint:disable-next-line: no-empty
    public renderFixedTable() { }
    public renderTable() {
        const me = this;
        const {
            columns = [],
            dataSource = [],
        } = me.props;
        return (
            <table>
                <thead>
                    <tr>
                        {me.renderHeader(columns)}
                    </tr>
                </thead>
                <tbody>
                    {me.renderBody(columns, dataSource)}
                </tbody>
            </table>
        )
    }
    public isFixed() {
        const me = this;
        const {
            columns=[],
        } = me.props;
        return columns.some((col) => col.fixed === true);
    }
    public render() {
        const me = this;
        return (
            <div className="biz-table">
                <div className="biz-table_content">
                    <div className="biz-table_scroll">
                        {me.renderTable()}
                    </div>
                    <div className="biz-table_fixed-left">
                    </div>
                    <div className="biz-table_fixed-right">
                    </div>
                </div>

            </div>
        );
    }
}

export default Table;
