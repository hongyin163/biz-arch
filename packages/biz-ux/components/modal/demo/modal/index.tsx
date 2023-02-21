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
    public onCancel = () => {
        this.setState({
            visible: false,
        })
    }
    public onShow = () => {
        this.setState({
            visible: true,
        })
    }
    public onOk = () => {
        this.setState({
            visible: false,
        })
    }
    public render() {
        const me = this;
        const {
            visible,
        } = me.state;
        return (
            <div>
                <Button onClick={me.onShow}>显示窗口</Button>
                <Modal
                    visible={visible}
                    title="提示窗口"
                    onCancel={me.onCancel}
                    onOk={me.onOk}
                >
                    提示内容
                </Modal>
            </div>
        )
    }
}
