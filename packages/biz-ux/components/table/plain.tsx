import React, { Component } from 'react';
import { IColumnProps, ITableProps } from './types';

class Table<T> extends Component<ITableProps<T>, any> {
    public state = {}
    public renderHeader = (columns: Array<IColumnProps<T>>) => {
        return columns.map((col) => {
            return (
                <th key={col.key} align={col.align || 'center'} colSpan={col.colSpan || 1}>
                    {col.title}
                </th>
            )
        })
        return '';
    }
    public renderBody = (columns: Array<IColumnProps<T>>, dataSource: T[]) => {
        return dataSource.map((item, i) => {
            const tds = columns.map((col) => {
                return (
                    <td
                        key={col.dataIndex}>
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
    public render() {
        const me = this;
        const {
            columns = [],
            dataSource = [],
        } = me.props;
        return (
            <div className="biz-table">
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
            </div>
        );
    }
}

export default Table;
