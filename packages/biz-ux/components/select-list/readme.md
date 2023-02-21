下拉列表，支持单选，多选，是由 LIst 、SelectPanel 、 InputTag 三个组件构成。

单选：
```js
import React, { Component } from 'react';

const Option = SelectList.Option;

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: '1'
        };
        me.onChange = me.onChange.bind(me);
    }
    onChange(value) {
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
                <SelectList
                    value={value}
                    placeholder="学历"
                    panelStyle={{
                        minWidth: 120,                        
                    }}
                    onChange={me.onChange}
                    style={{
                        margin:'10px 0'
                    }}
                >
                    <Option value={''}>不限</Option>
                    <Option value={'1'}>大专</Option>
                    <Option value={'2'}>本科</Option>
                    <Option value={'3'}>硕士</Option>
                    <Option value={'4'}>博士</Option>
                </SelectList>
                <SelectList
                    mode="single"
                    value={value}
                    placeholder="学历"
                    panelStyle={{
                        minWidth: 120,
                    }}
                    onChange={me.onChange}
                    style={{
                        margin:'10px 0'
                    }}
                >
                    <Option value={''}>不限</Option>
                    <Option value={'1'}>大专</Option>
                    <Option value={'2'}>本科</Option>
                    <Option value={'3'}>硕士</Option>
                    <Option value={'4'}>博士</Option>
                </SelectList>
            </div>
        )
    }
}

<Demo />
```

多选：
```js
import React, { Component } from 'react';
const Option = SelectList.Option;

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: ['1','2']
        };
        me.onChange = me.onChange.bind(me);
    }
    onChange(value) {
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
            <SelectList
                mode="multiple"
                value={value}
                placeholder="学历"
                panelStyle={{
                    minWidth: 120,
                }}
                onChange={me.onChange}                
            >
                <Option value={''}>不限</Option>
                <Option value={'1'}>大专</Option>
                <Option value={'2'}>本科</Option>
                <Option value={'3'}>硕士</Option>
                <Option value={'4'}>博士</Option>
            </SelectList>
        )
    }
}

<Demo />
```

禁用状态：

```js
import React, { Component } from 'react';

const Option = SelectList.Option;

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: '1'
        };
        me.onChange = me.onChange.bind(me);
    }
    onChange(value) {
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
            <SelectList
                disabled={true}
                value={value}
                placeholder="学历"
                panelStyle={{
                    minWidth: 120,                        
                }}
                onChange={me.onChange}
                style={{
                    margin:'10px 0'
                }}
            >
                <Option value={''}>不限</Option>
                <Option value={'1'}>大专</Option>
                <Option value={'2'}>本科</Option>
                <Option value={'3'}>硕士</Option>
                <Option value={'4'}>博士</Option>
            </SelectList>
        )
    }
}

<Demo />
```

```js
import React, { Component } from 'react';
const Option = SelectList.Option;

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            value: ['1','2']
        };
        me.onChange = me.onChange.bind(me);
    }
    onChange(value) {
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
            <SelectList
                disabled={true}
                mode="multiple"
                value={value}
                placeholder="学历"
                panelStyle={{
                    minWidth: 120,
                }}
                onChange={me.onChange}                
            >
                <Option value={''}>不限</Option>
                <Option value={'1'}>大专</Option>
                <Option value={'2'}>本科</Option>
                <Option value={'3'}>硕士</Option>
                <Option value={'4'}>博士</Option>
            </SelectList>
        )
    }
}

<Demo />
```
