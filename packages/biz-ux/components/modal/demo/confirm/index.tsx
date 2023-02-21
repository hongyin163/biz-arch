import React, { Component } from 'react'
import Button from '../../../button';
import Modal from '../../index'
import '../../style';
export default class Index extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            visible: false,
        }
    }
    public onInfo = () => {
        Modal.info({
            content: '你好',
        });
    }
    public onError = () => {
        Modal.error({
            content: '操作失败',
        });
    }
    public onSuccess = () => {
        Modal.success({
            content: '操作成功',
        });
    }
    public onWarning = () => {
        Modal.warning({
            content: '您没有权限',
        });
    }
    public onRichText = () => {
        Modal.error({
            content: '操作失败,<br/> 失败原因：……',
        });
    }
    public onShowReact=()=>{
        Modal.error({
            content:(
                <div>
                    操作失败
                </div>
            ),
        });
    }
    public render() {
        const me = this;
        return (
            <div>
                <Button onClick={me.onInfo}>Info</Button>
                <Button onClick={me.onSuccess}>Success</Button>
                <Button onClick={me.onError}>Error</Button>
                <Button onClick={me.onWarning}>Warning</Button>
                <Button onClick={me.onRichText}>显示HTML</Button>
                <Button onClick={me.onShowReact}>显示React组件</Button>
            </div>
        )
    }
}
