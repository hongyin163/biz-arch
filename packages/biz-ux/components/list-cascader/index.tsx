import React, { Component } from 'react';
import Icon from '../_common/icon';
import List from '../list';
import { IListCascaderProps, IListCascaderState } from './types';
import classNames from 'classnames';

/**
 * @visibleName ListCascader 层叠列表
 */
class ListCascader extends Component<IListCascaderProps, any> {
    public static defaultProps: IListCascaderProps = {
        mode: 'single',
        textField: 'text',
        valueField: 'value',
        childrenField: 'children',
        maxLevel: 10,
    }
    public state: IListCascaderState
    constructor(props, context) {
        super(props, context);
        const me = this;
        // 每级选择的value值
        const value = props.value || props.defaultValue || [];

        me.state = {
            options: props.options || [],
            select: me.initValue(value),
            checked: me.initChecked(value),
            columns: me.getColumns(props),
        };
    }
    public componentWillReceiveProps(nextProps) {
        const me = this;
        if (nextProps.hasOwnProperty('value')) {
            const {
                value = [],
            } = nextProps;

            me.setState({
                select: me.initValue(value),
                checked: me.initChecked(value),
            })
        }
    }
    public initValue(value) {

        if (typeof value === 'string') {
            if (value) {
                return [value];
            } else {
                return [];
            }
        }
        return value || [];
    }
    public initChecked(value = []) {
        return value.reduce((pre, key) => {
            return Object.assign(pre, {
                [key]: true,
            })
        }, {})
    }
    public triggerOnChange = () => {
        const me = this;
        const {
            onChange,
            mode = 'single',
        } = me.props;

        if (!onChange) {
            return;
        }

        const {
            select,
            checked,
        } = me.state;
        if (mode === 'single') {
            onChange(select);
        } else if (mode === 'multiple') {
            const checkItems = Object
                .keys(checked)
                .filter((key) => checked[key])
            onChange(checkItems);
        }
    }
    public initColumns(props) {
        const me = this;
        const {
            options, value = [],
        } = props;
        me.setState({
            options,
            select: me.initValue(value),
            checked: me.initChecked(value),
            columns: me.getColumns(props),
        });
    }
    public setChecked(value: any[] = [], checked) {
        const me = this;
        return new Promise((resolve) => {
            me.setState((state) => {
                value.forEach((val) => {
                    state.checked[val] = checked;
                })
                return state;
            }, resolve);
        })
    }

    public setSelected = (index, value) => {
        const me = this;
        return new Promise((resolve) => {
            me.setState((state) => {
                const select = state.select;

                select.splice(index + 1);
                select[index] = value;
                state.select = select.map(p => p);

                return state;
            }, resolve);
        })
    }
    // public setListValue(i, value: any[] = []) {
    //     const me = this;
    //     me.setState((state) => {
    //         const list = state.checked.map((p) => p);
    //         list[i] = value;
    //         state.checked = list;
    //         return state;
    //     });
    // }
    public getListValue = (index) => {
        const me = this;
        const {
            mode = 'single',
        } = me.props;
        const {
            checked = {},
            select = [],
        } = me.state;
        // console.log(checked)
        let value;
        if (mode === 'single') {
            value = [select[index]];
        } else {

            value = Object
                .keys(checked)
                .filter((key) => checked[key])
        }
        // console.log(value)
        return value;
    }
    public getColumns(props) {
        const {
            options = [],
            value = [],
            valueField,
            childrenField,
        } = props;
        let opts = options;
        if (!opts || opts.length === 0) {
            return [];
        }
        if (!value || value.length === 0) {
            return [opts];
        }

        const list: any[] = [];
        // tslint:disable-next-line: prefer-for-of
        for (let n = 0; n < value.length; n++) {
            list.push(opts);
            const item = opts.find((p) => p[valueField] === value[n]);
            if (!item) {
                break;
            }
            opts = item[childrenField];
        }

        return list;
    }
    public getSelectedValue() {
        const me = this;
        const {
            textField,
            valueField,
            childrenField,
        } = me.props;
        const {
            select = [],
            options,
        } = me.state;
        const values: any[] = [];
        let list = options;
        select.forEach((value) => {
            const item = list.find(p => p[valueField] === value);
            values.push({
                [textField]: item[textField],
                [valueField]: item[valueField],
            });
            list = item[childrenField];
        });
        return values;
    }
    public isHaveSubLeval(index, value) {
        const me = this;
        const {
            valueField,
            childrenField,
        } = me.props;
        const {
            columns,
        } = me.state;
        const i = Number(index);
        const list = columns[i];
        const item = list.find((p) => p[valueField] === value);
        const childs = item[childrenField];
        if (Array.isArray(childs)) {
            return childs.length > 0;
        }
        return !!childs;
    }
    public setSubValue = (index, value) => {
        const me = this;
        const {
            valueField,
            childrenField,
        } = me.props;
        const {
            columns,
            select,
        } = me.state;

        index = Number(index);
        const list = columns[index];
        const item = list.find((p) => p[valueField] === value);
        if (columns.length > index + 1) {
            columns.splice(index + 1);
            select.splice(index + 1);
        }

        if (item[childrenField]) {
            // return;
            columns.push(item[childrenField]);
        }
        return new Promise((resolve) => {
            me.setState({ columns, select }, resolve);
        })
    }
    public onListItemClick = (index, value, event) => {
        const me = this;
        const {
            onItemClick = () => null,
        } = me.props;
        setTimeout(async () => {
            await me.setSelected(index, value);
            await me.setSubValue(index, value);
            me.triggerOnChange();
            onItemClick(value, event);
        }, 20);
    }
    public onListItemCheck = async (index, value: any[] = [], checked) => {
        const me = this;
        const {
            columns,
        } = me.state;
        const {
            valueField,
            onItemCheck = () => void 0,
        } = me.props;
        const col: any[] = columns[index];
        const item = col.filter((p) => value.indexOf(p[valueField]) >= 0);
        me.setChecked(value, checked);
        onItemCheck(item, checked);
        me.triggerOnChange();
    }
    public getListItemMode = (opt, i) => {
        const me = this;
        const {
            listItemModes,
        } = me.props;
        if (typeof listItemModes === 'function') {
            return listItemModes(opt, i);
        }
        if (Array.isArray(listItemModes) && listItemModes.length > 0) {
            return listItemModes[i];
        }
        return 'default'
    }
    public getListItemTitle = (opt, i) => {
        const me = this;
        const {
            listItemTitles,
        } = me.props;
        if (typeof listItemTitles === 'function') {
            return listItemTitles(opt, i);
        }
        if (Array.isArray(listItemTitles) && listItemTitles.length > 0) {
            return listItemTitles[i] || '';
        }
        return ''
    }
    public renderList() {
        const me = this;
        const {
            textField,
            valueField,
            childrenField,
            maxLevel = 10,
        } = me.props;
        const {
            columns = [],
        } = me.state;

        if (columns.length <= 0) {
            return null;
        }

        const isMulti = columns[0].some((opt) => opt[childrenField] && opt[childrenField].length > 0);
        return columns.map((opts, i) => {
            const isOutLevel = i + 1 > maxLevel;
            if (isOutLevel) {
                return null;
            }
            const isLastLevel = i + 1 === maxLevel;
            return (
                <div className="biz-list-cascader_item-warper"
                    style={{
                        width: 'auto',
                        display: isMulti ? 'inline-block' : 'block',
                    }}
                >
                    <List
                        mode={me.getListItemMode(opts, i)}
                        title={me.getListItemTitle(opts, i)}
                        value={me.getListValue(i)}
                        onItemClick={me.onListItemClick.bind(me, i)}
                        onItemCheck={me.onListItemCheck.bind(me, i)}
                        checkItemOnClick={isMulti ? false : true}
                    >
                        {
                            opts.map((opt) => {
                                return (
                                    <List.Item value={opt[valueField]}>
                                        {opt[textField]}
                                        {
                                            (!isLastLevel && opt[childrenField] && opt[childrenField].length > 0) && (
                                                <Icon type="arrow-solid-right" />
                                            )
                                        }
                                    </List.Item>
                                );
                            })
                        }
                    </List>
                </div>
            );
        });
    }
    public render() {
        const me = this;
        const {
            style = {},
            className = '',
        } = me.props;
        const cls = classNames('biz-list-cascader', className);
        return (
            <div className={cls} style={style}>
                {me.renderList()}
            </div>
        )
    }
}

export default ListCascader;
