// tslint:disable: no-console

import { Table } from 'biz-ux';
import React, { Component } from 'react';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: '',
        };
    }
    public onChange(e) {
        this.setState({
            value: e.target.value,
        })
    }
    public render() {
        const me = this;
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        const scroll = {
            x: 900,
            mode: 'horizontal',
        };
        return (
            <Table 
                rowSelection={rowSelection} 
                scroll={scroll} 
                columns={columns} 
                dataSource={data} 
                rowKey="key"
            />
        )
    }
}

export default Demo;
