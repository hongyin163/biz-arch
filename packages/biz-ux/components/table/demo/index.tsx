
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from '../index';
import '../style';

class Demo extends Component<any, any>{
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = { value: 0 };
    }
    public onChange(value) {
        this.setState({
            value,
        })
    }
    public render() {
        const me = this;
        const {
            value,
        } = me.state;

        const columns = [
            {
                title: 'Full Name',
                width: 100,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
            },
            {
                title: 'Age',
                width: 100,
                dataIndex: 'age',
                key: 'age',
                fixed: 'left',
            },
            { title: 'Column 1', dataIndex: 'address', key: '1' },
            { title: 'Column 2', dataIndex: 'address', key: '2' },
            { title: 'Column 3', dataIndex: 'address', key: '3' },
            { title: 'Column 4', dataIndex: 'address', key: '4' },
            { title: 'Column 5', dataIndex: 'address', key: '5' },
            { title: 'Column 6', dataIndex: 'address', key: '6' },
            { title: 'Column 7', dataIndex: 'address', key: '7' },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => <a>action</a>,
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 40,
                address: 'London Park',
            },
        ];

        return (
            <div style={{ padding: 10 }}>
                <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />

            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
