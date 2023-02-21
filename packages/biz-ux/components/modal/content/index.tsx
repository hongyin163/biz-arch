import React, { Component, ReactNode } from 'react'
import Icon from '../../_common/icon';
export interface IOpConfirmContentProps {
    /** 
     * 
     * type 提醒格式，默认为success
     * 取值：success warning info error confirm 
     * 
     * children 显示文案
     * 
    */
    type?: string;
    content?: string | ReactNode;
}
export default class ModalContent extends Component<IOpConfirmContentProps, any> {
    public render() {
        const {
            type = 'success',
            content = '操作提醒',
        } = this.props;
        let child = null;
        if (typeof content === 'string') {
            child = (
                <span dangerouslySetInnerHTML={{
                    __html: content,
                }}>
                </span>
            )
        } else {
            child = <span>{content}</span>;
        }
        return (
            <span className="biz-modal_confirm-content">
                <Icon type={type} className={`biz-modal_confirm-icon-${type}`} />
                {
                    child
                }
            </span>
        )
    }
}
