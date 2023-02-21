模态窗示例：
```js 
import React, { Component } from 'react'
import Button from '../button';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            visible: false,
        }
    }
    onCancel(){
        this.setState({
            visible: false,
        })
    }
    onShow(){
        this.setState({
            visible: true,
        })
    }
    onOk(){
        this.setState({
            visible: false,
        })
    }
    render() {
        const me = this;
        const {
            visible
        } = me.state;
        return (
            <div>
                <Button onClick={me.onShow.bind(me)}>显示窗口</Button>
                <Modal
                    visible={visible}
                    title="提示窗口"
                    onCancel={me.onCancel.bind(me)}
                    onOk={me.onOk.bind(me)}
                >
                    提示内容
                </Modal>
            </div>
        )
    }
}

<Demo/>
```

提示窗：
```js
import React, { Component } from 'react';
import Button from '../button';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            visible: false,
        }
    }
    onInfo(){
        Modal.info({
            content: '你好'
        });
    }
    onError(){
        Modal.error({
            content: '操作失败'
        });
    }
    onSuccess(){
        Modal.success({
            content: '操作成功'
        });
    }
    onWarning() {
        Modal.warning({
            content: '您没有权限'
        });
    }
    render() {
        const me = this;
        return (
            <div>
                <Button onClick={me.onInfo}>Info</Button>
                <Button onClick={me.onSuccess}>Success</Button>
                <Button onClick={me.onError}>Error</Button>
                <Button onClick={me.onWarning}>Warning</Button>
            </div>
        )
    }
}

<Demo/>
```
