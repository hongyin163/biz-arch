// import {message} from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import MsgList from '../_common/msg/msg-list';
import { IMessageApi } from './types';
// import { Message } from './Message';

// export default message;

function createElement(id) {
    const doc = document;
    let element = doc.getElementById(id);
    if (!element) {
        element = doc.createElement('div');
        element.id = id;
        doc.body.appendChild(element);
    }
    return element;
}

let instance;
function getInstance(callback) {
    if (!instance) {
        const el = createElement('biz-message_root');
        ReactDOM.render(
            <MsgList
                className="biz-message"
                transitionName="slide-up"
                ref={(p) => {
                    instance = p;
                    callback(instance);
                }}
            />
            , el)
    } else {
        callback(instance);
    }
}


let seed = 1;
const api: any = {
    open({ type, content, duration, onClose }) {
        const key = seed++;
        getInstance((ins) => {
            if (!ins) {
                return;
            }
            ins.add({ key, type, message: content, duration, onClose });
        });
        return function hide() {
            getInstance((ins) => {
                ins.remove(key);
            })
        }
    },
};
['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
    api[type] = (content, duration, onClose?) => {
        return api.open({ type, content, duration, onClose });
    };
});

/**
 * @visibleName message 全局提醒
 */
export default api as IMessageApi;
