多选按钮示例：

```js
<Radio checked={true} />
<Radio checked={false} />
<Radio checked={true} disabled={true} />
<Radio checked={false} disabled={true} />
```

Radio 是受控组件，使用示例如下：
```js
import React,{Component} from 'react';

class Demo extends Component{
    constructor(props,context){
        super(props,context);
        const me=this;
        me.state = {checked:false};
    }
    onChange(checked){
        this.setState({
            checked
        })
    }
    render(){
        const me=this;
        const {
            checked
        }=me.state;
        return (
            <Radio checked={checked} onChange={me.onChange.bind(me)} />
        )
    }
}

<Demo/>
```

分组Radio使用示例：
```js
import React,{Component} from 'react';

class Demo extends Component{
    constructor(props,context){
        super(props,context);
        const me=this;
        me.state = {value:0};
    }
    onChange(value){
        this.setState({
            value
        })
    }
    render(){
        const me=this;
        const {
            value
        }=me.state;
        return (
            <Radio.Group value={value} onChange={me.onChange.bind(me)}>
                <Radio value={0}>苹果</Radio>
                <Radio value={1}>西瓜</Radio>
                <Radio value={2}>葡萄</Radio>
            </Radio.Group>
        )
    }
}

<Demo/>
```

分组 Radio 按钮样式使用示例：

```js
import React,{Component} from 'react';

class Demo extends Component{
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = { value: 0 };
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
            <div style={{ padding: 10 }}>
                <Radio.Group value={value} onChange={me.onChange.bind(me)}>
                    <Radio.Button value={0}>苹果</Radio.Button>
                    <Radio.Button value={1}>西瓜</Radio.Button>
                    <Radio.Button value={2}>葡萄</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}
<Demo/>
```
