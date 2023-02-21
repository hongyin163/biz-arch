// import {message} from 'antd';
import classNames from 'classnames'
import React from 'react';
import ReactDOM from 'react-dom';
import MsgList from '../_common/msg/msg-list';
import { ConfigProps, IArgsProps, INotificationApi, NotificationPlacement } from './types';
// import { Message } from './Message';
const notificationInstance: { [key: string]: any } = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement: NotificationPlacement = 'bottomRight';
let defaultGetContainer: () => HTMLElement;

function setNotificationConfig(options: ConfigProps) {
    const { duration, placement, bottom, top, getContainer } = options;
    if (duration !== undefined) {
        defaultDuration = duration;
    }
    if (placement !== undefined) {
        defaultPlacement = placement;
    }
    if (bottom !== undefined) {
        defaultBottom = bottom;
    }
    if (top !== undefined) {
        defaultTop = top;
    }
    if (getContainer !== undefined) {
        defaultGetContainer = getContainer;
    }
}

function getPlacementStyle(placement: NotificationPlacement) {
    let style;
    switch (placement) {
        case 'topLeft':
            style = {
                left: 0,
                top: defaultTop,
                bottom: 'auto',
            };
            break;
        case 'topRight':
            style = {
                right: 0,
                top: defaultTop,
                bottom: 'auto',
            };
            break;
        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: defaultBottom,
            };
            break;
        default:
            style = {
                right: 0,
                top: 'auto',
                bottom: defaultBottom,
            };
            break;
    }
    return style;
}

function getTransitionName(placement) {
    switch (placement) {
        case 'topLeft':
        case 'bottomLeft':
            return 'slide-left';
        case 'topRight':
        case 'bottomRight':
        default:
            return 'slide-right';
    }
}

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

function getInstance(config: ConfigProps, callback) {
    const { placement = defaultPlacement, hideArrow = true } = config;
    const cacheKey = placement;
    let instance = notificationInstance[cacheKey];
    if (!instance) {
        const el = createElement(`biz-message_root-${cacheKey}`);
        const clg = classNames('biz-notification', placement, hideArrow ? 'hide-arrow' : '')
        ReactDOM.render(
            <MsgList
                className={clg}
                style={getPlacementStyle(placement)}
                transitionName={getTransitionName(placement)}
                ref={(p) => {
                    instance = p;
                    notificationInstance[cacheKey] = instance;
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
    open(config: IArgsProps) {
        const key = config.key || seed++;
        getInstance(config, (ins) => {
            if (!ins) {
                return;
            }
            ins.add(config);
        });
        return function hide() {
            getInstance(config, (ins) => {
                ins.remove(key);
            })
        }
    },
    config: setNotificationConfig,
    close(key: string) {
        Object.keys(notificationInstance).forEach(cacheKey =>
            notificationInstance[cacheKey].remove(key),
        );
    },
    destroy() {
        Object.keys(notificationInstance).forEach(cacheKey => {
            notificationInstance[cacheKey].destroy();
            delete notificationInstance[cacheKey];
        });
    },
};

['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
    api[type] = (config: IArgsProps) => {
        return api.open({
            ...config,
            type,
        });
    };
});

/**
 * @visibleName Notification 通知提醒框
 */
export default api as INotificationApi;
