import Calendar  from '../index';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../../style/index.less';
import '../style/index.less';

export default class Demo extends Component {

    public DomTest = () => {
        return (<div>
            哈哈哈
        </div>);
    }

    public render() {
        return (
            <div >
                <Calendar
                    onChange={() => null}
                    dateCellRender={this.DomTest}
                />
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
