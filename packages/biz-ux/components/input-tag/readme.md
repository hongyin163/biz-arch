标签输入组件

```js
<InputTag />
```

使用示例如下：

```js
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state ={
            value:[{
                key:'1',
                value:'标签1'
            },{
                key:'2',
                value:'标签1'
            }]
        }
        me.onValueChange=me.onValueChange.bind(me);
    }
    onValueChange(value){
        this.setState({
            value
        })
    }
    render() {
        const me = this;
        const {
            value
        } = me.state;
        return (
            <div>
                <InputTag
                    value={value}
                    textField="value"
                    valueField="key"
                    placeholder="请输入标签"
                    onChange={me.onValueChange}                    
                />         
                <InputTag                
                    value={value}
                    textField="value"
                    valueField="key"
                    placeholder="请输入标签"
                    onChange={me.onValueChange}
                    hideInput={true}
                />
                <InputTag                
                    value={value}
                    textField="value"
                    valueField="key"
                    placeholder="请输入标签"
                    onChange={me.onValueChange}
                    isWrap={false}
                />
            </div>
        )
    }
}

<Demo />
```
