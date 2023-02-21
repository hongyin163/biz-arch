import { util } from 'biz-lib';
import classnames from 'classnames';
import Animate from 'rc-animate';
import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import Portal from '../_common/portal';
import { SelectProps } from './interface';
import Option from './option';

export interface SelectPropsCustom extends SelectProps {
    label?: string;
    className?: string;
    onClick?: () => void;
    children?: React.ReactElement[];
}

class List extends Component<any> {
    public componentWillMount() {
        document.addEventListener('click', this.close);
    }
    public componentWillUnmount() {
        document.removeEventListener('click', this.close);
    }
    public close = (e) => {
        const me = this;
        const {
            onClose = () => null,
        } = me.props;
        onClose(e);
    }
    public render() {
        return this.props.children;
    }
}
/**
 * @visibleName Select 下拉列表
 */
// tslint:disable-next-line: max-classes-per-file
export default class Select extends Component<SelectPropsCustom, {}>{
    public static displayName = 'Select'
    public static Option: typeof Option;
    public dropdownContainer: HTMLDivElement;

    public state = {
        selected: false,
        value: '',
        checkedLabel: '',
    };
    public componentDidMount() {
        this.setDefaultValue(this.props);
    }
    public componentWillReceiveProps(nextProps) {
        this.setDefaultValue(nextProps);
    }
    public setDefaultValue = (props) => {
        const me = this;
        const {
            children,
            value,
            defaultValue,
            placeholder,
        } = props;

        if (React.Children.count(children) <= 0) {
            return;
        }

        const currentValue = !util.isUndefined(value) ? value : defaultValue;
        const child = React.Children.toArray(children).find(p => p.props.value === currentValue + '');
        if (child) {
            me.setState({
                value: child.props.value,
                checkedLabel: child.props.children,
            });
        } else if (placeholder) {
            me.setState({
                value: '',
                checkedLabel: placeholder,
            });
        } else {
            me.setState({
                value: '',
                checkedLabel: '',
            });
        }

    }
    // 点击选择
    public handleSelected = () => {
        const me = this;
        const {
            onClick = () => null,
            disabled,
        } = this.props;
        if(disabled) { return false; }
        me.setState({
            selected: true,
        }, () => {
            onClick();
        })
    };
    public onOptionSelect = (val) => {
        const {
            onChange = () => null,
        } = this.props;

        this.setState({
            selected: false,
            value: val.value,
            checkedLabel: val.children,
        }, () => {
            onChange(val.value, val.children);
        });
    }
    // 获取option节点
    public getChildOptions = () => {
        const {
            children,
        } = this.props;
        return React.Children.map(children as React.ReactElement[], (child: React.ReactElement, i) => {
            return React.cloneElement(child, {
                id: i,
                onSelect: this.onOptionSelect,
                className: child.props.className,
            })
        })
    }
    public getOffset(node, root) {
        const nodeRect = node.getBoundingClientRect();
        const rootRect = root.getBoundingClientRect();
        // return nodeRect.left - rootRect.left;
        return {
            left: nodeRect.left - rootRect.left,
            top: nodeRect.top - rootRect.top,
        }
    }
    public getPanelStyle = () => {
        const me = this;
        const {
            getPopupContainer,
        } = me.props;
        const node = findDOMNode(me) as HTMLElement;
        const {
            width, height,
        } = node.getBoundingClientRect();
        const mountNode = getPopupContainer ? getPopupContainer(node as Element) : document.body;
        const offset = me.getOffset(node, mountNode);

        return {
            top: offset.top + height + 1,
            left: offset.left,
            width,
        }
    }
    // 渲染option
    public renderOption = () => {
        const me = this;
        const {
            selected,
        } = me.state;
        const childs = this.getChildOptions();
        return (
            <Animate
                transitionName="slide-up"
            >
                {
                    selected && (
                        <List onClose={me.handleCloseSelect}>
                            <div
                                className="biz-select-dropdown"
                                style={{
                                    ...me.getPanelStyle(),
                                }}
                            >
                                {childs}
                            </div>
                        </List>
                    )
                }
            </Animate>
        );
    };
    public getContainer = () => {
        const me = this;
        const {
            getPopupContainer,
        } = me.props;
        const id = 'biz-select-root';
        const popupContainer = document.createElement('div');
        popupContainer.id = id;
        popupContainer.style.position = 'absolute';
        popupContainer.style.top = '0';
        popupContainer.style.left = '0';
        popupContainer.style.width = '100%';
        const mountNode = getPopupContainer ? getPopupContainer(findDOMNode(me) as Element) : document.body;
        mountNode.appendChild(popupContainer);
        return popupContainer;
    }
    // 渲染下拉列表
    public renderSelectMenu = () => {
        const me = this;
        return (
            <Portal
                getContainer={me.getContainer}
            >
                {me.renderOption()}
            </Portal>
        )
    };
    // 关闭下拉列表
    public handleCloseSelect = () => {
        this.setState({
            selected: false,
        });
    }
    public render() {
        const me = this;
        const {
            className,
            // label = '',
            style = {},
            placeholder,
            disabled = false,
        } = me.props;
        const { selected, checkedLabel, value } = me.state;

        return (
            <div className={classnames('biz-select', className, { 'biz-select_focus': !disabled && selected },{'biz-select_disabled':disabled})}
                ref="bizSelect"
                style={style}
            >
                <div
                    className={classnames('biz-select-selection')}
                    onClickCapture={me.handleSelected}
                >
                    <div className="biz-select-selection_rendered">
                        <div className={classnames('biz-select-selection-selected-value', {
                            'placeholder': util.isUndefined(value),
                        })}>
                            {!util.isUndefined(value) ? checkedLabel : placeholder}
                        </div>
                        <span unselectable="on" className="biz-select-arrow">
                            <i className="biz-select-arrow-icon" />
                        </span>
                    </div>
                </div>
                {me.renderSelectMenu()}
            </div>
        );
    }
}
Select.Option = Option;
