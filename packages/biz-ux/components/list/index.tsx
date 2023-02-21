import classNames from 'classnames';
import React, { Component } from 'react';
import Item from './item';
import ListItem from './list-item';
import { ListProps } from './types';

interface DisabledItems { [x: string]: { disabled: boolean, checked: boolean } }

interface IListState {
    checked: { [x: string]: boolean };
    focus: any;
    disabled: DisabledItems;
}

/**
 * @visibleName List 列表组件
 */
class List extends Component<ListProps, any> {
    public static Item: typeof Item;
    public state: IListState;
    // public static getDerivedStateFromProps(props, state) {
    //     // 受控
    //     if (props.hasOwnProperty('value')) {
    //         const value = props.value || [];
    //         const checked = value.reduce((pre, val) => {
    //             return Object.assign(pre, {
    //                 [val]: true,
    //             })
    //         }, {});
    //         return {
    //             checked,
    //         }
    //     } else {
    //         return state;
    //     }
    // }
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            checked: me.initChecked(props.value, props.defaultValue),
            focus: {},
            disabled: me.initDisabled(props.disabledValue),
        }
    }
    public componentWillReceiveProps(props) {
        if (props.hasOwnProperty('value')) {
            const me = this;

            const value = props.value || [];
            const checked = me.valueToMap(value);
            const disabled = me.initDisabled(props.disabledValue);
            me.setState({
                checked,
                disabled,
            });
        }
    }
    public valueToMap(value = []) {
        return (value).reduce((pre, val) => {
            return Object.assign(pre, {
                [val]: true,
            })
        }, {});
    }
    public initDisabled(disabledValue = []) {
        return disabledValue.reduce((pre, val: { value, checked }) => {
            return Object.assign(pre, {
                [val.value]: {
                    disabled: true,
                    checked: val.checked,
                },
            })
        }, {});
    }
    public initChecked(value = [], defaultValue = []) {
        return this.valueToMap(value || defaultValue);
    }
    public setFocus = (value) => {
        const me = this;
        return new Promise((resolve) => {
            me.setState((state) => {
                state.focus = value;
                return state;
            }, resolve);
        })
    }
    public setChecked = (value, checked) => {
        const me = this;
        const {
            mode = 'default',
        } = me.props;
        return new Promise((resolve) => {
            me.setState((state) => {
                if (mode === 'default' || mode === 'single') {
                    state.checked = {
                        [value]: checked,
                    };
                } else {
                    state.checked[value] = checked;
                }
                return state;
            }, resolve);
        })
    }
    public setAllChecked = (checked) => {
        const me = this;
        const value = me.getValues();
        return new Promise((resolve) => {
            if (checked) {
                me.setState((state) => {
                    state.checked = value.reduce((pre, val) => {
                        return Object.assign(pre, {
                            [val]: checked,
                        })
                    }, {});
                    return state;
                }, resolve);
            } else {
                me.setState({ checked: {} }, resolve);
            }
        })
    }
    public isAllSelected() {
        const me = this;
        const {
            checked,
        } = me.state
        return me.getValues().every((val) => checked[val] === true)
    }
    public getSelectItems() {
        const me = this;
        const {
            checked = {},
        } = me.state;
        return me.getValues().filter((val) => checked[val] === true)
    }
    public getValues() {
        const me = this;
        const {
            children = [],
        } = me.props;
        return React.Children.map(children as React.ReactElement[], (child: React.ReactElement) => {
            const { value = '' } = child.props;
            return value;
        })
    }
    public onItemSelectForSingle = (value, event) => {
        const me = this;
        const {
            onChange = () => void 0,
            onItemClick = () => void 0,
            onItemCheck = () => void 0,
            mode = 'default',
        } = me.props;
        if (mode === 'default') {
            Promise.all([
                me.setChecked(value, true),
                me.setFocus(value),
            ]).then(() => {
                const items = me.getSelectItems();
                onChange(items);
                onItemClick(value, event);
            });
        } else if (mode === 'single') {
            Promise.all([
                me.setChecked(value, true),
                me.setFocus(value),
            ]).then(() => {
                const items = me.getSelectItems();
                onChange(items);
                onItemClick(value, event);
                onItemCheck([value], true);
            });
        }
    }
    public renderSingleItems() {
        const me = this;
        const {
            checked,
            focus,
            disabled,
        } = me.state;
        const {
            children = [],
            mode = 'default',
        } = me.props;
        return React.Children.map(children as React.ReactElement[], (child: React.ReactElement) => {
            const { value = '' } = child.props;
            return (
                <ListItem
                    focus={focus === value}
                    checked={me.isChecked(disabled, checked, value)}
                    value={value}
                    mode={mode}
                    onClick={me.onItemSelectForSingle}
                    disabled={me.isDisable(disabled, value)}
                >
                    {child}
                </ListItem>
            )
        });
    }
    public onCheckItem = (value, checked) => {
        const me = this;

        const {
            onChange = () => void 0,
            onItemCheck = () => void 0,
        } = me.props;
        if (value === '__ALL') {
            me.setAllChecked(checked)
                .then(() => {
                    onChange(me.getSelectItems())
                    onItemCheck(me.getValues(), checked);
                })
        } else {

            me.setChecked(value, checked)
                .then(() => {

                    onChange(me.getSelectItems())
                    onItemCheck([value], checked);
                })
        }
    }
    public onItemSelectForMulti = (value, event) => {
        const me = this;
        const {
            onItemClick = () => void 0,
        } = me.props;
        me.setFocus(value);
        onItemClick(value, event);
    }
    public isDisable(disabled: DisabledItems, value) {
        if (!disabled[value]) {
            return false;
        }
        return disabled[value].disabled;
    }
    public isChecked(disabled: DisabledItems, checked, value) {
        if (!disabled[value]) {
            return checked[value];
        }
        return disabled[value].checked;
    }
    public renderMultipleItems() {
        const me = this;
        const {
            checked,
            disabled,
            focus,
        } = me.state

        const {
            children,
            checkItemOnClick = false,
        } = me.props;

        if (React.Children.count(children) === 0) {
            return null;
        }

        const checkItem = [
            <ListItem
                value={'__ALL'}
                checked={me.isAllSelected()}
                mode="multiple"
                onCheck={me.onCheckItem}
            >
                全选
            </ListItem>,
        ];
        const items = React.Children.map(children as React.ReactElement[], (child: React.ReactElement) => {
            const { value = '' } = child.props;
            return (
                <ListItem
                    focus={focus === value}
                    checked={me.isChecked(disabled, checked, value)}
                    value={value}
                    checkBoxVisible={true}
                    checkItemOnClick={checkItemOnClick}
                    mode="multiple"
                    onCheck={me.onCheckItem}
                    onClick={me.onItemSelectForMulti}
                    disabled={me.isDisable(disabled, value)}
                >
                    {child}
                </ListItem>
            )
        })
        return checkItem.concat(items);
    }
    public render() {
        const me = this;
        const {
            mode = 'default',
            className,
            style,
            title,
        } = me.props;
        const cls = classNames('biz-list', className);
        return (
            <div className={cls} style={style}>
                {
                    title && (
                        <div className="biz-list_title">
                            {title}
                        </div>
                    )
                }
                {
                    mode === 'multiple' ? me.renderMultipleItems() : me.renderSingleItems()
                }
            </div>
        )
    }
}

List.Item = Item;

export default List;
