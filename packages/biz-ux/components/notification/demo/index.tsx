import { Button } from 'biz-ux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import notification from '../index';
import '../style';
let n = 0;
export default class Demo extends Component {
    public onClick(type) {
        n++;
        notification[type]({
            key: type + (n),
            message: '下载简历',
            description: `共操作 12000 位候选人${n}`,
            // onClose,
            // duration?: number | null;
            // icon?: React.ReactNode;
            placement: 'bottomRight',
            duration:0,
            type,
            className:'custom-class',
            // style?: React.CSSProperties;
            // className?: string;
            // readonly type?: NoticeType;
            // onClick?: () => void;
            // icon:<div/>
        });
    }
    public render() {
        const me = this;
        return (
            <div>
                {
                    ['success', 'info', 'warning', 'error', 'loading'].map((type) => {
                        return (
                            <Button onClick={me.onClick.bind(me, type)}>{type}</Button>
                        )
                    })
                }
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
