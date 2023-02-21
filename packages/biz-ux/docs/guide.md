

## 安装
```bash
npm install biz-ux --save 
```

## 使用

### 全部引入方式：

应用入口引入 css：
```js static
import 'biz-ux/dist/biz-ux.css';
```
组件引入：
```js static
import { Checkbox } from 'biz-ux';
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
```

### 按需引入：


安装插件
```bash static
npm i babel-plugin-import --save-dev
```

在 `babel 7` 的 `babel.config.js` 文件配置如下：
```js static
module.exports = function (api) {
    api.cache(true);
    const presets = [
        // env ，react 等 presets
    ];
    const plugins = [
        // 其他插件
        [
            "babel-plugin-import",
            {
                "libraryName": "biz-ux",
                "libraryDirectory":"es",
                "style": true
            },
            "biz-ux"
        ]
    ];

    return {
        presets,
        plugins
    };
}

```

组件引入：
```js static
import { Checkbox } from 'biz-ux';
```

被插件替换为：
```js static
import Checkbox from 'biz-ux/es/checkbox';
import  'biz-ux/es/style';
```
