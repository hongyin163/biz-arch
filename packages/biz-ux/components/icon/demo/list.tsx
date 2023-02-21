import React, { Component } from 'react';
import Icon from '../index';
import list from './data.json';

import './index.less';
class List extends Component {
    public onCopy = (e) => {
        const target = e.currentTarget as HTMLDivElement;
        const dom = target.querySelector('.name') as HTMLParagraphElement;
        document.execCommand('copy');
    }
    public render() {
        const me = this;

        return (
            <div className="icon-demo">
                {
                    list.map((type) => (
                        <div key={type} className="icon-demo_item" onDoubleClick={me.onCopy}>
                            <Icon type={type} />
                            <p className="name">{type}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default List;
