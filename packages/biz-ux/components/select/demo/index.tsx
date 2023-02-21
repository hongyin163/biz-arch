import { Select } from 'biz-ux';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../../style/index.less';
import '../style/index.less';
import './index.less';

const Option = Select.Option;

class Demo extends Component {
    public render() {
        return (
            <div className="container">
                <h2>Select调试</h2>
                <Select style={{width:'200px'}} value="-1" placeholder="请选择省份">
                    <Option value="-1">不限</Option>
                    <Option value="1">北京市</Option>
                    <Option value="2">河北省</Option>
                    <Option value="3">山西省</Option>
                </Select>
            </div>
        )
    }
}

ReactDOM.render(<Demo/>,document.getElementById('root'));
