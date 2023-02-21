import { util } from 'biz-lib'
import classNames from 'classnames';
import Animate from 'rc-animate';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Icon from '../_common/icon';
import Portal from '../_common/portal'
import isSSR from '../_util/isSSR';
import Panel from './panel';
// import Input from '../input';
import { ISelectPanelProps, ISelectPanelState } from './types';
/**
 * @visibleName SelectPanel 下拉弹窗
 */
class SelectPanel extends Component<ISelectPanelProps, ISelectPanelState>{
    public static defaultProps = {
        value: '',
        position: "down",
    }
    public static getDerivedStateFromProps(props, state) {
        // 受控
        if (props.hasOwnProperty('visible')) {
            state.visible = props.visible;
            return state;
        } else {
            return state;
        }
    }
    public container: any;
    constructor(props: ISelectPanelProps, context: any) {
        super(props, context);
        const me = this;
        me.state = {
            visible: false,
        };
        me.container = null;
    }
    public setVisible = (visible: any) => {
        const me = this;
        // 受控组件
        if (me.props.hasOwnProperty('visible')) {
            return;
        }
        return new Promise((resolve) => {
            me.setState({
                visible,
            }, resolve)
        })
    }
    public isShowPlaceholder = (value) => {
        const me = this;
        const {
            isShowPlaceholder,
        } = me.props;
        if (isShowPlaceholder) {
            return isShowPlaceholder(value);
        }
        if (util.isEmpty(value)) {
            return true;
        }
        return false;
    }
    public defaultRenderValue = (value: any) => {
        if (Array.isArray(value)) {
            return value.join(' , ');
        }
        return value;
    }
    public renderValue = (value) => {
        const me = this;
        const {
            renderValue,
            placeholder,
        } = me.props;

        if (me.isShowPlaceholder(value)) {
            return (
                <span className="placeholder">{placeholder}</span>
            )
        }

        if (renderValue) {
            return renderValue(value);
        }

        return me.defaultRenderValue(value);
    }
    public renderInput = () => {
        const me = this;
        const {
            value,
            renderInput,
        } = me.props;
        const {
            visible,
        } = me.state;
        return (
            <div className="biz-select-panel_input" ref="input" onClick={me.onClickInput}>
                {
                    !renderInput && (
                        <>
                            <div className="biz-input biz-select-panel_render ">
                                {
                                    me.renderValue(value)
                                }
                            </div>
                            <div className="biz-select-panel_arrow-warpper">
                                <Animate
                                    component=""
                                    showProp={'data-visible'}
                                    transitionName="rotate"
                                >
                                    <Icon key="1" className="biz-select-panel_arrow" data-visible={visible} type="arrow-solid-down" style={{
                                        transform: `rotate(${visible ? '180deg' : '0'})`,
                                    }} />
                                </Animate>
                            </div>
                        </>
                    )
                }
                {
                    renderInput && renderInput(value)
                }

            </div>
        )
    }
    public onClickInput = async () => {
        const me = this;
        const {
            onFocus = () => null,
            disabled = false,
        } = me.props;
        if (disabled) {
            return;
        }
        await me.setVisible(true);
        onFocus();
    }

    public onClose = async () => {
        const me = this;
        const {
            onClose = () => null,
        } = me.props;
        await me.setVisible(false);
        onClose();
    }
    public onClickPanel = (e: React.MouseEvent<any>) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
    }
    public getOffset(node, root) {
        const nodeRect = node.getBoundingClientRect();
        const rootRect = root.getBoundingClientRect();
        // return nodeRect.left - rootRect.left;
        return {
            left: nodeRect.left - rootRect.left,
            top: nodeRect.top - rootRect.top,
            bottom: rootRect.bottom - nodeRect.bottom,
        }
    }
    public getContainer = () => {
        const me = this;
        const {
            getPopupContainer,
            position,
        } = me.props;
        if (me.container) {
            return me.container
        }
        const mountNode = getPopupContainer ? getPopupContainer(findDOMNode(me) as Element) : document.body;
        const id = 'biz-select-panel_root';
        const popupContainer = document.createElement('div');
        popupContainer.className = id;
        popupContainer.style.position = 'absolute';
        popupContainer.style.width = '100%';
        mountNode.appendChild(popupContainer);

        if (position === 'down') {
            popupContainer.style.top = '0';
            popupContainer.style.left = '0';
            popupContainer.style.bottom = 'auto'
        } else if (position === 'up') {
            popupContainer.style.bottom = '0';
            popupContainer.style.top = 'auto';
            popupContainer.style.left = '0';
        }
        me.container = popupContainer
        return popupContainer;
    }
    public getPanelStyle = () => {
        const me = this;
        const {
            panelStyle,
            getPopupContainer,
            position,
        } = me.props;

        const node = findDOMNode(me) as HTMLElement;
        const mountNode = getPopupContainer ? getPopupContainer(node) : document.body;
        const {
            width, height, bottom, top,
        } = node.getBoundingClientRect();

        const clientHeight = document.body.clientHeight;

        let pos = position;
        const topHeight = top;
        const bottomHeight = clientHeight - bottom;
        const container = me.getContainer();

        if (topHeight < 80) {
            pos = 'down';
            container.style.top = '0';
            container.style.left = '0';
            container.style.bottom = 'auto'
        } else if (bottomHeight < 80) {
            pos = 'up';
            container.style.bottom = '0';
            container.style.top = 'auto';
            container.style.left = '0';
        }

        const offset = me.getOffset(node, mountNode);
        if (pos === 'down') {
            return {
                top: offset.top + height + 1,
                left: offset.left,
                width,
                ...panelStyle,
            }
        } else if (pos === 'up') {
            return {
                bottom: offset.bottom + height + 1,
                left: offset.left,
                width,
                ...panelStyle,
            }
        }
    }
    public getTransitionName = () => {
        const me = this;
        const {
            getPopupContainer,
            position,
        } = me.props;

        if (isSSR()) {
            return "slide-up";
        }

        const node = findDOMNode(me) as HTMLElement;
        if (!node) {
            return ''
        }
        const {
            bottom, top,
        } = node.getBoundingClientRect();
        const clientHeight = document.body.clientHeight;

        let pos = position;
        const topHeight = top;
        const bottomHeight = clientHeight - bottom;

        if (topHeight < 80) {
            pos = 'down';
        } else if (bottomHeight < 80) {
            pos = 'up';
        }
        return pos === "down" ? "slide-up" : "slide-down"
    }
    public renderPanel = () => {
        const me = this;
        const {
            visible,
        } = me.state;

        const {
            children,
            footer,
            disabled = false,
        } = me.props;

        // if (!visible) {
        //     return (
        //         <Portal
        //             getContainer={me.getContainer}
        //         >  </Portal>
        //     );
        // }

        // if (disabled) {
        //     return null;
        // }
        return (
            <Portal
                getContainer={me.getContainer}
            >   
                <Animate
                    transitionName={me.getTransitionName()}
                >
                    {
                        visible && (
                            <div
                                className="biz-select-panel_content"
                                onClick={me.onClickPanel}
                                style={{
                                    ...me.getPanelStyle(),
                                }}
                            >
                                <Panel onClose={me.onClose}>
                                    {children}
                                </Panel>
                                {footer}
                            </div>
                        )
                    }
                </Animate>
            </Portal>
        )
    }
    public render() {
        const me = this;
        const {
            style = {},
            className,
            disabled = false,
        } = me.props;
        const {
            visible,
        } = me.state;
        const cls = classNames({
            'biz-select-panel': true,
            'disabled': disabled,
        }, className);
        return (
            <div className={cls} style={style}>
                {
                    me.renderInput()
                }
                {
                    me.renderPanel()
                }
            </div>
        )
    }
}

export default SelectPanel;
