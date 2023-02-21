import { Button ,SelectList} from 'biz-ux'
import React, { Component } from 'react';
const Option = SelectList.Option;

export default class Demo extends Component<any, any> {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: '1',
            disabled:true,
            list:[1,2,3,4,5,6,7,8],
        };
        me.onChange = me.onChange.bind(me);
    }
    public onChange(value) {
        this.setState({
            value,
        })
    }
    public handleDisabled = ()=>{
        this.setState({
            disabled: !this.state.disabled,
        })
    }
    public handleDelete = (index)=>{
        const {
            list,
        } = this.state;
        list.splice(index,1);
        this.setState({
            list,
        })
    }
    public render() {
        const me = this;
        const {
            value,
            disabled,
            list,
        } = me.state;
        return (
            <div>
                {
                    list.map((item,index)=>{
                        return <div style={{display:'flex'}}>
                            <SelectList
                                value={value}
                                placeholder="学历"
                                panelStyle={{
                                    minWidth: 120,
                                }}
                                onChange={me.onChange}
                                style={{
                                    width: 200,
                                    margin:'0 0 10px',
                                }}
                                disabled={disabled}
                            >
                                <Option value={''}>不限</Option>
                                <Option value={'1'}>大专</Option>
                                <Option value={'2'}>本科</Option>
                                <Option value={'3'}>硕士</Option>
                                <Option value={'4'}>博士</Option>
                            </SelectList>
                            <Button onClick={()=>me.handleDelete(index)}>
                                删除
                            </Button>
                        </div>
                    })
                }
                <SelectList
                    mode="single"
                    value={value}
                    placeholder="学历"
                    panelStyle={{
                        minWidth: 120,
                    }}
                    onChange={me.onChange}
                    style={{
                        margin: '10px 0',
                    }}
                    disabled={disabled}
                >
                    <Option value={''}>不限</Option>
                    <Option value={'1'}>大专</Option>
                    <Option value={'2'}>本科</Option>
                    <Option value={'3'}>硕士</Option>
                    <Option value={'4'}>博士</Option>
                </SelectList>
                
                <Button onClick={me.handleDisabled}>
                    {disabled?'启用':'禁用'}
                </Button>
            </div>
        )
    }
}
