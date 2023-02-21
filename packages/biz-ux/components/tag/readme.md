Tag组件示例：

```js
<Tag>善良</Tag>
<Tag checked={true}>温柔</Tag>
<Tag checked={false}>大方</Tag>
<Tag closable>无所不能</Tag>
```

Tag组件支持展示和选择，提供两种基础样式：
```js
    <Tag closable>标签</Tag>
    <Tag.CheckTag>标签</Tag.CheckTag>
```

使用示例如下：
```js
import React,{Component} from 'react';

class Demo extends Component{
    constructor(props,context){
        super(props,context);
        const me=this;
        me.state = {
            list:[
                {
                    text:'标签1',
                    checked:true
                },
                {
                    text:'标签1',
                    checked:false
                }
            ]
        };
    }
    onChange(checked){
        this.setState({
            checked
        })
    }
    closeTag(param){
        console.log(param);
    }
    clickCheckTag(param){
        console.log(param);
    }
    renderTag(){
        const me = this;
        const {
            list
        }=me.state;
        return list.map((item,index)=>{
            return (
                <Tag.CheckTag
                    onClick={me.clickCheckTag}
                >
                    {item.text}
                </Tag.CheckTag>
            )
        })
    }
    renderChecktTag(){
        const me = this;
        const {
            list
        }=me.state;
        return list.map((item,index)=>{
            return (
                <Tag
                    closable
                    onClose={me.closeTag}
                >
                    {item.text}
                </Tag>
            )
        })
    }
    render(){
        const me = this;
        return (
            <div>
                {
                    me.renderTag()
                }
                {
                    me.renderChecktTag()
                }
            </div>
        )
    }
}

<Demo/>
```
