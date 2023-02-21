import classNames from 'classnames';
import React from 'react';
import InputBase from '../_common/input-base';
import Button from '../button';
import ListCascader from '../list-cascader';
import Loading from '../loading';
import SelectPanel from '../select-panel';
import { ICascaderProps } from './types';
interface KeyValue {
    key: string,
    value: string,
}

/**
 * @visibleName Cascader 级联选择
 */
export default class Cascader extends InputBase<ICascaderProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // value: [],
            visible: false,
        }
    }
    public componentDidMount() {
        // this.onInputFocus();
    }
    public toKeyValueList(values = []) {
        const me = this;
        const {
            textField,
            valueField,
            childrenField,
        } = me.props;
        return values.map((item) => {
            return {
                key: item[valueField],
                value: item[textField],
                data: item[childrenField],
            }
        })
    }
    public fromKeyValueList(values) {
        const me = this;
        const {
            textField,
            valueField,
            childrenField,
        } = me.props;
        return values.map((item) => {
            return {
                [valueField]: item.key,
                [textField]: item.value,
                [childrenField]: item.data,
            }
        })
    }
    public getKeyValueList(value = []) {
        const me = this;
        const {
            textField,
            valueField,
            childrenField,
        } = me.props;
        return value.map((item) => {
            return {
                key: item.key,
                value: item.value,
            }
        })
    }
    public setLoading(isLoading) {
        Loading.setDisalbe(isLoading);
        this.setState({
            isLoading,
        })
    }
    public setVisible(visible) {
        this.setState({
            visible,
        })
    }
    // public onValueChange = (value) => {
    //     const me = this;
    //     me.setValue(me.getKeyValueList(value));
    // }
    public onClose = () => {
        this.setState({
            visible: false,
        })
    }
    public isHaveChildren(data = []) {
        const me = this;
        const {
            childrenField,
        } = me.props;
        return data.some((item) => {
            if (item[childrenField] && item[childrenField].length > 0) {
                return true;
            }
        })
    }
    public getListItemTitle = (opt, i) => {
        return '';
    }
    public onListChange = (value = []) => {
        // console.log('onListChange', value);
        const me = this;
        const {
            options,
            valueField = 'key',
            textField = "value",
            childrenField = "data",
        } = me.props;
        let opts: any[] = options;
        const list = value.map((key) => {
            // tslint:disable-next-line
            const item = opts.find(p => p[valueField] == key);
            if (!item) {
                return {};
            }
            opts = item[childrenField] || [];
            return {
                [valueField]: item[valueField],
                [textField]: item[textField],
            };
        });
        me.setValue(list);
    }
    public onConfirm = () => {
        const me = this;
        const {
            onConfirm = () => null,
        } = me.props;
        me.onClose();
        onConfirm();
    }
    public onClear = () => {
        const me = this;
        me.setValue([]);
        me.onConfirm();
    }
    public renderTree = () => {
        const me = this;
        const {
            maxLevel = 3,
            options,
            valueField = 'key',
            textField = "value",
            childrenField = "data",
        } = me.props;
        const value = me.getValue() || [];
        const firstMode = me.isHaveChildren(options) ? 'default' : 'multiple';
        return (
            <ListCascader
                value={value.map((p => p[valueField]))}
                listItemModes={[firstMode, 'default', 'default']}
                listItemTitles={me.getListItemTitle}
                options={options}
                valueField={valueField}
                textField={textField}
                childrenField={childrenField}
                onChange={me.onListChange}
                maxLevel={maxLevel}
            />
        )
    }

    public onInputFocus = async () => {
        const me = this;
        me.setVisible(true);
    }
    public renderValue = (values: KeyValue[] = []): string => {
        const me = this;
        const {
            renderValue,
        } = me.props;

        if (renderValue) {
            return renderValue(values);
        }
        return values.map(v => v.value).join(' / ');
    }
    public renderFooter() {
        const me = this;
        // const value = me.getValue() || [];
        return (
            <div className="biz-cascader_footer">
                <div className="left">

                </div>
                <div className="right">
                    <Button type="primary" size="small" onClick={me.onConfirm}>确定</Button>
                    <Button type="minor" size="small" onClick={me.onClear}>清空</Button>
                </div>
            </div>
        )
    }
    public render() {
        const me = this;
        const {
            placeholder = '请选择',
            className,
            getPopupContainer,
            panelStyle,
        } = me.props;
        const {
            visible,
        } = me.state;
        const val = me.getValue() || [];
        const cls = classNames('biz-cascader', className);
        return (
            <SelectPanel
                getPopupContainer={getPopupContainer}
                className={cls}
                panelStyle={panelStyle}
                visible={visible}
                value={val}
                onClose={me.onClose}
                placeholder={placeholder}
                onFocus={me.onInputFocus}
                renderValue={me.renderValue as any}
                footer={me.renderFooter()}
            >
                {me.renderTree()}
            </SelectPanel>
        )
    }
}
