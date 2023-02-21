多选按钮示例：

```js
<Checkbox checked={true} />
<Checkbox checked={false} />
<Checkbox checked={true} disabled={true} />
<Checkbox checked={false} disabled={true} />
```

Checkbox 是受控组件，使用示例如下：
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
            <Checkbox checked={checked} onChange={me.onChange.bind(me)} />
        )
    }
}

<Demo/>
```

Checkbox 组的示例：

```js
import React,{Component} from 'react';

class Demo extends Component{
    constructor(props,context){
        super(props,context);
        const me=this;
        me.state = {value:[0]};
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
            <Checkbox.Group >
                <Checkbox value={0} >苹果</Checkbox>
                <Checkbox value={1} >香蕉</Checkbox>
                <Checkbox value={3} >橘子</Checkbox>
            </Checkbox.Group>
        )
    }
}

<Demo/>
```
