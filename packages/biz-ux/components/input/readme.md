输入框示例：

```js 
<Input value="你好" size='large' />
```

```js 
<Input value="你好" size='default' />
```

```js 
<Input value="你好" size='small' />
```
禁用：
```js 
<Input disabled={true} value="你好" size='small' />
```


使用示例如下：
```js
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = { 
            value: ''
        };
    }
    onChange(e) {
        this.setState({
            value:e.target.value
        })
    }
    render() {
        const me = this;
        const {
            value
        } = me.state;
        return (
            <Input value={value} onChange={me.onChange.bind(me)} />
        )
    }
}

<Demo />
```
