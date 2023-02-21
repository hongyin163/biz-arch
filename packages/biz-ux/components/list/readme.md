### 列表组件

列表组件提供了单选、多选的列表，提供三种模式：`default`，`multiple`，`single`。

`default` 和`single` 都是单选，`default` 下不显示单选按钮，`multiple` 模式下显示多选框。

#### `default` 模式示例：
```js
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            data: [
                '苹果',
                '西瓜',
                '西红柿'
            ],
            value: [],
        };
        me.onListSelect = me.onListSelect.bind(me);
    }
    onListSelect(value) {

        this.setState({
            value,
        })
    }
    render() {
        const me = this;
        const {
            data,
            value,
        } = me.state;
        return (
            <>
                <List value={value} onChange={me.onListSelect} >
                    {
                        data.map((item, i) => {
                            return (
                                <List.Item value={i}>
                                    {item}
                                </List.Item>
                            )
                        })
                    }
                </List>         
                <p>
                    value：{JSON.stringify(value)}
                </p>
            </>
        )
    }
}

<Demo />
```

#### `single` 多选示例
```js
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            data: [
                '苹果',
                '西瓜',
                '西红柿'
            ],
            value: [],
        };
        me.onListSelect = me.onListSelect.bind(me);
    }
    onListSelect(value) {
        this.setState({
            value,
        })
    }
    render() {
        const me = this;
        const {
            data,
            value,
        } = me.state;
        return (
            <>
                <List value={value} mode="single" onChange={me.onListSelect} >
                        {
                            data.map((item, i) => {
                                return (
                                    <List.Item value={i}>
                                        {item}
                                    </List.Item>
                                )
                            })
                        }
                </List>
                <p>
                    value：{JSON.stringify(value)}
                </p>
            </>
        )
    }
}

<Demo />
```

#### `multiple` 多选示例
```js
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            data: [
                '苹果',
                '西瓜',
                '西红柿'
            ],
            value: [0],
        };
        me.onListSelect = me.onListSelect.bind(me);
    }
    onListSelect(value) {
        this.setState({
            value,
        })
    }
    render() {
        const me = this;
        const {
            data,
            value,
        } = me.state;
        return (
            <>
                <List value={value} mode="multiple" onChange={me.onListSelect} >
                    {
                        data.map((item, i) => {
                            return (
                                <List.Item value={i}>
                                    {item}
                                </List.Item>
                            )
                        })
                    }
                </List>
                <p>
                    value：{JSON.stringify(value)}
                </p>
            </>
        )
    }
}

<Demo />
```
