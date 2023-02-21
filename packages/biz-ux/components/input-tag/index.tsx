import classNames from 'classnames';
import Animate from 'rc-animate';
import React, { Component } from 'react'
import Icon from '../_common/icon'
import Input from '../input';
import TagWarpper from './TagWarpper';
import {
    IInputTagProps,
    IInputTagState,
} from './types';

/**
 * @visibleName InputTag 标签输入框
 */
class InputTag extends Component<IInputTagProps, IInputTagState> {
    public static displayName = 'InputTag'
    public static defaultProps = {
        value: [],
        valueField: 'value',
        textField: 'text',
        onInputChange: (value) => value,
        onFocus: () => void 0,
        onBlur: () => void 0,
        placeholder: '请输入',
        hideInput: false,
        isWrap: true,
        disabled: false,
    }
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: me.formAtValue(props),
            input: '',
            isFocus: false,
        }
    }
    public componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps')
        // console.log(this.props.value)
        // console.log(nextProps.value)
        // console.log(this.props.value.length !== nextProps.value.length)
        // if (this.props.value.length !== nextProps.value.length) {

        const me = this;
        const state = {
            value: me.state.value,
            isFocus: me.state.isFocus,
        }
        if (nextProps.hasOwnProperty('value')) {
            state.value = me.formAtValue(nextProps);
        }

        if (nextProps.hasOwnProperty('focus')) {
            state.isFocus = nextProps.focus;
        }
        me.setState(state);
    }
    public componentDidMount() {
        // console.log('componentDidMount')
    }
    public triggerOnChange() {
        const me = this;
        const {
            onChange,
        } = me.props;
        if (onChange) {
            onChange(me.state.value);
        }
    }
    public render() {
        const me = this;
        const {
            style,
            placeholder,
            inputWidth = 100,
            className,
            hideInput = false,
            isWrap = true,
            disabled = false,
        } = me.props;
        const {
            input,
            isFocus,
        } = me.state;
        const title = me.renderListTip();
        const cls = classNames('biz-input', 'biz-input-tag', className, isFocus && isWrap ? 'wrap focus' : '')
        return (
            <div className={cls} onClick={me.onWarperClick} style={style} title={title}>
                {
                    (isFocus && isWrap) ? (
                        <TagWarpper onClose={me.onBlur}>
                            {me.renderList()}
                        </TagWarpper>
                    ) : me.renderList()
                }
                {
                    !hideInput && (
                        <Input
                            disabled={disabled}
                            ref="input"
                            type="text"
                            value={input}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                            }}
                            placeholder={placeholder}
                            className="noborder"
                            style={{ width: inputWidth }}
                            onFocus={me.onFocus}
                            // onBlur={me.onBlur}
                            onChange={me.onInputChange}
                            onPressEnter={me.onPressEnter}
                            onKeyDown={me.onInputKeyDown}

                        />
                    )
                }
                <div className="biz-input-tag_arrow-warpper" >
                    <Animate
                        component=""
                        showProp={'data-visible'}
                        transitionName="rotate"
                    >
                        <Icon key="1"
                            className="biz-input-tag_arrow"
                            data-visible={isFocus}
                            type="arrow-solid-down"
                            style={{
                                transform: `rotate(${isFocus ? '180deg' : '0'})`,
                            }} />
                    </Animate>
                </div>
            </div>
        )
    }
    public clearInput = () => {
        const me = this;
        me.setInput('');
    }
    private addTag(value, text) {
        const me = this;
        const {
            valueField,
            textField,
        } = me.props;
        return new Promise((resolve) => {
            me.setState((state) => {
                const tag = {
                    [valueField]: value,
                    [textField]: text,
                }
                const val = state.value;
                val.push(tag);
                return state;
            }, resolve)
        })
    }
    private removeTag(value) {
        const me = this;
        const {
            valueField,
        } = me.props;
        return new Promise((resolve) => {
            me.setState((state) => {
                const vals = state.value;
                const index = vals.findIndex(p => p[valueField] === value);
                vals.splice(index, 1);
                return state;
            }, resolve)
        })
    }
    private remvoeTagByIndex(index) {
        const me = this;
        return new Promise((resolve) => {
            me.setState((state) => {
                const vals = state.value;
                vals.splice(index, 1);
                return state;
            }, resolve)
        })
    }
    private setInput(input) {
        return new Promise((resolve) => {
            this.setState({
                input,
            }, resolve)
        })
    }
    private setFocus(isFocus) {
        return new Promise((resolve) => {
            this.setState({
                isFocus,
            }, resolve)
        })
    }
    private onWarperClick = (e: React.MouseEvent) => {
        const me = this;
        const {
            onFocus = () => void 0,
            onBlur = () => void 0,
            hideInput,
        } = me.props;
        // console.log('onWarperClick')
        const {
            isFocus,
        } = me.state;
        // console.log('isFocus', isFocus)
        // 折行状态
        if (isFocus) {
            e.nativeEvent.stopImmediatePropagation();
            me.setFocus(false).then(() => {
                onBlur();
            })
            return;
        } else {
            if (hideInput) {
                return onFocus();
            }
            const input = me.refs.input as HTMLInputElement;
            input.focus();
            me.setFocus(true).then(() => {
                onFocus();
            })
        }
    }
    private onInputChange = (e) => {
        const me = this;
        const {
            onInputChange,
        } = me.props;
        this.setState({
            input: e.target.value,
        }, () => {
            onInputChange(me.state.input);
        })
    }
    private onPressEnter = () => {
        const me = this;
        const {
            input,
        } = me.state;
        if (!input) {
            return false;
        }
        const {
            onPressEnter,
            onFocus = () => void 0,
        } = me.props;
        if (onPressEnter) {
            onPressEnter(input);
            return;
        }
        me.addTag(input, input).then(() => {
            me.triggerOnChange();
        });
        me.setInput('').then(() => {
            onFocus();
        })
    }
    private onInputKeyDown = (e) => {
        const me = this;
        const {
            value,
        } = me.state;
        if (value.length === 0 || e.target.value.length > 0) {
            return;
        }
        if (e.keyCode === 8) {
            me.remvoeTagByIndex(value.length - 1).then(() => {
                me.triggerOnChange();
            })
        }
    }
    private renderListTip() {
        const me = this;
        const {
            value,
        } = me.state;
        // console.log(value);
        const {
            textField,
        } = me.props
        if (!value || value.length <= 0) {
            return null;
        }
        return value.map((item) => {
            if (typeof item[textField] === 'string') {
                return item[textField];
            }
            return '';
        }).filter(p => !!p).join('，');
    }
    private renderList() {
        const me = this;
        const {
            value,
        } = me.state;
        // console.log(value);
        const {
            valueField, textField, hideInput, placeholder, disabled = false,
        } = me.props
        if (!value || value.length <= 0) {
            if (hideInput && placeholder) {
                return (
                    <span className="placeholder">{placeholder}</span>
                )
            }
            return null;
        }
        return value.map((item) => {
            const val = item[valueField];
            const txt = item[textField];
            return (
                <span className="biz-input-tag_item" >
                    <span data-value={val} title={txt}>{txt}</span>
                    {
                        !disabled && (
                            <Icon type="close" title="删除" onClick={me.onRemove.bind(me, val)} />
                        )
                    }
                </span>
            )
        })
    }
    private onRemove = (value, e: React.MouseEvent<any>) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        const me = this;

        me.removeTag(value)
            .then(() => {
                me.triggerOnChange();
            });
    }
    private formAtValue(props) {
        const {
            value = [],
            valueField,
            textField,
        } = props;
        const countObj: { [x: string]: boolean } = {};
        // 去重
        return value.filter((item) => {
            const val = (item && typeof item === 'object') ? item[valueField] : item;
            if (countObj[val]) {
                return false
            } else {
                countObj[val] = true;
                return true;
            }
        }).map((item) => {
            if (typeof item === 'object') {
                return item;
            }
            return {
                [valueField]: item,
                [textField]: item,
            }
        })
    }
    private onFocus = () => {
        const me = this;
        const {
            onFocus = () => void 0,
        } = me.props;
        me.setFocus(true).then(() => {
            onFocus();
        })
    }
    private onBlur = () => {
        const me = this;
        const {
            onBlur = () => void 0,
        } = me.props;
        me.setFocus(false).then(() => {
            onBlur();
        })
    }
}

export default InputTag;
