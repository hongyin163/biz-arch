import { Switch } from 'biz-ux';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../../style/index.less';
import '../style/index.less';

export default class Demo extends Component {
    public state = {
        checked:false,
    }
    public handleChange = (val)=>{
        // this.setState({
        //     checked:val,
        // })
    }
    public render() {
        const {
            checked,
        } = this.state;
        return (
            <div style={{padding:'30px'}}>
               <Switch checkedChildren="11" unCheckedChildren="22" checked={checked} onChange={this.handleChange}/>
            </div>
        )
    }
}

ReactDOM.render(<Demo/>,document.getElementById('root'))
