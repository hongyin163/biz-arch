import { util } from 'biz-lib';
import React from 'react'
import InputBase from '../_common/input-base';
import InputTag from '../input-tag'
import List from '../list'
import SelectPanel from '../select-panel'
import Option from './option'

import { ISelectListProps, ISelectListState } from './types'

/**
 * @visibleName SelectList 下拉列表
 */
export default class SelectList extends InputBase<ISelectListProps, ISelectListState> {
    public static displayName = 'SelectList'
    public static Option = Option;
    public static defaultProps = {
        placeholder: '请输入',
    }
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: props.value,
            visible: false,
        }
    }
    public setVisible(visible) {
        this.setState({
            visible,
        })
    }
    public onListChange = (values: any[] = []) => {
        const me = this;
        me.setListValue(values);
    }
    public setListValue(values) {
        const me = this;
        const {
            mode = 'default',
        } = me.props;
        if (mode === 'multiple') {
            me.setValue(values);
        } else {
            me.setValue(values[0]);
            me.setVisible(false);
        }
    }
    public getListValue(): any[] {
        const me = this;
        const {
            mode = 'default',
        } = me.props;
        if (mode === 'multiple') {
            return me.getValue();
        } else {
            const value = me.getValue();
            if (!util.isUndefined(value)) {
                return [value];
            }
        }
        return [];
    }
    public getOptionValues = (): Array<{ key, value }> => {
        const me = this;
        const {
            children,
        } = me.props;
        if (!children) {
            return [];
        }
        if (React.Children.count(children) <= 0) {
            return [];
        }
        const keyValueList: any[] = [];
        React.Children.forEach(children as React.ReactElement[], (child: React.ReactElement, i) => {
            if (!child) {
                return;
            }
            keyValueList.push({
                key: child.props.value,
                value: child.props.children,
            });
        })
        return keyValueList;
    }
    /**
     * 显示多选列表
     */
    public renderMuiltiOpt = () => {
        const me = this;
        const {
            mode,
        } = me.props;
        const listValue = me.getListValue();
        const keyValueList = me.getOptionValues();
        return (
            <List
                mode={mode}
                value={listValue}
                onChange={me.onListChange}
                checkItemOnClick={true}
            >
                {
                    keyValueList.map(({ key, value }) => {
                        return (
                            <List.Item value={key} >
                                {value}
                            </List.Item>
                        )
                    })
                }
            </List>
        )

    }
    // 根据值显示对应的文本
    public renderText = () => {
        const me = this;
        const {
            placeholder,
        } = me.props;
        const kvs = me.getOptionValues();
        const keys = me.getListValue();

        if (!keys || keys.length === 0) {
            return (
                <span className="placeholder">{placeholder}</span>
            );
        }

        const selectValues = kvs.filter(item => {
            return keys.some(key => {
                // 类型相同
                if (typeof key === typeof item.key) {
                    return key === item.key
                }
                if (key === '' || key === null) {
                    return false;
                }
                // tslint:disable-next-line: triple-equals   
                return key == item.key
            });
        });

        if (selectValues.length <= 0) {
            return (
                <span className="placeholder">{placeholder}</span>
            );
        }
        return selectValues.map((p) => p.value);
    }
    public onInputFocus = () => {
        this.setVisible(true);
    }
    public onValueChange = (value: Array<{ key, value }>) => {
        const me = this;
        const values = value.map(p => p.key);
        me.setListValue(values);
    }
    public renderMuiltiInput = () => {
        const me = this;
        const {
            placeholder,
            hideInput = true,
            renderInput,
            disabled = false,
        } = me.props;
        const kvs = me.getOptionValues();
        const values = me.getListValue() || [];
        const selectValues = kvs.filter(item => values.indexOf(item.key) >= 0);
        // console.log(selectValues)
        if (renderInput) {
            return renderInput(selectValues);
        }
        return (
            <InputTag
                disabled={disabled}
                value={selectValues}
                valueField="key"
                textField="value"
                placeholder={placeholder}
                onFocus={me.onInputFocus}
                hideInput={hideInput}
                onChange={me.onValueChange}
            />
        )
    }
    public getMuiltiInputProps = () => {
        const me = this;
        return {
            renderInput: me.renderMuiltiInput,
        }
    }
    public getSingleInputProps = () => {
        const me = this;
        const {
            renderInput,
            renderValue,
        } = me.props;

        if (renderInput) {
            return {
                renderInput,
            }
        }
        if (renderValue) {
            return {
                renderValue,
            }
        }

        return {
            renderValue: me.renderText,
        }

    }
    public onClose = () => {
        this.setState({
            visible: false,
        })
    }
    public render() {
        const me = this;
        const {
            footer,
            mode,
            placeholder,
            ...rest
        } = me.props;
        const {
            visible,
        } = me.state;

        const value = me.getListValue();

        let renderProps;
        if (mode === 'multiple') {
            renderProps = me.getMuiltiInputProps();
        } else {
            renderProps = {
                ...me.getSingleInputProps(),
                onFocus: me.onInputFocus,
            }
        }

        return (
            <SelectPanel
                {...rest}
                visible={visible}
                onClose={me.onClose}
                value={value}
                placeholder={placeholder}
                footer={footer}
                {...renderProps}

            >
                <div className="biz-select-list">
                    {me.renderMuiltiOpt()}
                </div>
            </SelectPanel>
        )

    }

}
