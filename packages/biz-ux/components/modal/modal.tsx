import classNames from 'classnames';
import Animate from 'rc-animate';
import React, { Component } from 'react'
import Portal from '../_common/portal'
import Button, { ButtonType } from '../button';
import Icon from '../_common/icon';
import { ModalFunc, ModalProps } from './types';

/**
 * @visibleName Modal 模态窗
 */
export default class Modal extends Component<ModalProps, any> {
    public static displayName = 'Modal'
    public static info: ModalFunc;
    public static success: ModalFunc;
    public static error: ModalFunc;
    public static warn: ModalFunc;
    public static warning: ModalFunc;
    public static confirm: ModalFunc;

    constructor(props: ModalProps, context) {
        super(props, context);
        const me = this;
        me.state = {
            visible: false,
        }
    }
    public componentDidMount() {
        const me = this;
        const {
            visible,
        } = me.props;
        if (visible) {
            me.setState({
                visible: true,
            })
        }
    }
    public componentWillReceiveProps(props) {
        const me = this;
        const {
            visible,
        } = props;
        me.setVisible(visible);
    }

    public setVisible = (visible) => {
        const me = this;
        // const {
        //     afterClose = () => null,
        // } = me.props;
        return new Promise((resolve) => {
            me.setState({
                visible,
            }, resolve);
        });
    }
    public onClose = (e: React.MouseEvent<any, any>) => {
        if (e.nativeEvent) {
            e.nativeEvent.stopImmediatePropagation();
        }
        e.stopPropagation();
        const me = this;
        const {
            onCancel = () => null,
            afterClose = () => null,
        } = me.props;
        me.setVisible(false).then(() => {
            setTimeout(() => {
                onCancel(e);
                afterClose();
            }, 300)
        });
    }
    public renderDialog() {
        const me = this;
        const {
            style,
            width = 500,
        } = me.props;
        return (
            <div className="biz-modal_dialog" style={{
                position: 'fixed',
                left: '50%',
                width,
                marginLeft: -width / 2,
                ...style,
            }}
            >
                {me.renderHeader()}
                {me.renderBody()}
                {me.renderFooter()}
            </div>
        )
    }
    public renderCentered() {
        const me = this;
        const {
            style,
            width = 500,
        } = me.props;
        return (
            <div className="biz-modal_warpper">
                <div className="biz-modal_dialog centered" style={{
                    width,
                    ...style,
                }}

                >
                    {me.renderHeader()}
                    {me.renderBody()}
                    {me.renderFooter()}
                </div>
            </div>
        )
    }
    public renderMask(): React.ReactNode {
        const me = this;
        const {
            maskClosable,
            // maskTransitionName,
            maskStyle = {},
            mask = true,
        } = me.props;

        if (!mask) {
            return null;
        }

        const maskProps: React.HTMLAttributes<any> = {};
        if (maskClosable) {
            maskProps.onClick = me.onClose;
        }
        return (
            <div className="biz-modal_mask" style={maskStyle} {...maskProps}></div>
        )
    }
    public renderHeader(): React.ReactNode {
        const me = this;
        const {
            title,
            closable = true,
        } = me.props;
        if (!title) {
            return null;
        }
        return (
            <div className="biz-modal_header">
                {
                    title && (<span className="biz-modal_title">{title}</span>)
                }
                {
                    closable && (
                        <span className="biz-modal_close">
                            <Icon type="close" onClick={me.onClose} />
                        </span>
                    )
                }
            </div>
        )
    }
    public renderBody(): React.ReactNode {
        const me = this;
        const {
            children,
            bodyStyle,
        } = me.props;
        return (
            <div className="biz-modal_body" style={bodyStyle}>
                {children}
            </div>
        )
    }
    public renderFooter(): React.ReactNode {
        const me = this;
        const {
            footer,
            cancelText = '取消',
            okText = '确定',
            okType,
            onOk,
            okButtonProps = {},
            cancelButtonProps = {},
            footerDesc = '',
        } = me.props;

        if (footer) {
            return footer;
        }

        const okBtnType: ButtonType = okType || 'primary';
        const okButton = okText ? <Button type={okBtnType} onClick={onOk} {...okButtonProps}>{okText}</Button> : null;
        const cancelButton = cancelText ? <Button type="minor" onClick={me.onClose} {...cancelButtonProps} >{cancelText}</Button> : null;

        if (!okButton && !cancelButton) {
            return null;
        }

        return (
            <div className="biz-modal_footer">
                {
                    footerDesc && (
                        <div className="biz-modal_desc">
                            {footerDesc}
                        </div>
                    )
                }
                <div className="biz-modal_buttons">
                    {okButton}
                    {cancelButton}
                </div>

            </div>
        )
    }
    public getContainer = () => {
        const id = 'biz-modal_root';
        const popupContainer = document.createElement('div');
        popupContainer.id = id;
        // popupContainer.style.position = 'absolute';
        // popupContainer.style.top = '0';
        // popupContainer.style.left = '0';
        // popupContainer.style.width = '100%';
        const mountNode = document.body;
        mountNode.appendChild(popupContainer);
        return popupContainer;
    }
    public render() {
        const me = this;
        const {
            visible,
        } = me.state;

        const {
            centered = true,
            className,
            mask = true,
            transitionName = 'zoom',
        } = me.props;

        const cls = classNames('biz-modal', className);
        return (
            <Portal
                getContainer={me.getContainer}
            >
                <div
                    data-show={visible}
                    className={cls}
                    onMouseOver={(e) => e.stopPropagation()}
                    onMouseOut={(e) => e.stopPropagation()}
                >

                    <Animate
                        transitionName={transitionName}
                    >
                        {
                            visible ? (
                                centered ? me.renderCentered() : me.renderDialog()
                            ) : null
                        }
                    </Animate>
                    {
                        mask && (
                            <Animate
                                transitionName="fade"
                            >
                                {visible && me.renderMask()}
                            </Animate>
                        )
                    }
                </div>
            </Portal>
        );
    }

}
