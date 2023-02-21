# BizUX组件库

`biz-ux` 组件库是基于 `React` 的 `PC` 端 组件库，有以下几个特点

- 基于 `antd` 的API设计，兼容antd组件
- 粒度小，强调单一职责
- 基于 `Typescript` 开发，提供类型信息，方便使用
- 特色的表单和滚动条解决方案



## 环境支撑

现代浏览器，IE9 以上


## 安装
```bash
npm install biz-ux --save 
```

## 使用

### 全部引入方式：

应用入口引入 css：
```js 
import 'biz-ux/dist/biz-ux.css';
```
组件引入：
```js 
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
```bash 
npm i babel-plugin-import --save-dev
```

在 `babel 7` 的 `babel.config.js` 文件配置如下：
```js 
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
```js 
import { Checkbox } from 'biz-ux';
```

被插件替换为：
```js 
import Checkbox from 'biz-ux/es/checkbox';
import  'biz-ux/es/style';
```

## 组件开发

组件创建：

参考 `/template/component` 目录的结构创建组件，使用下面的命令启动开发模式：

```bash
npm run dev <name>
```

文档调试：
```bash
npm run doc:dev
```

组件开发规范见：[组件开发规范](http://biz-ui.58corp.com/#/%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83?id=section-%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83)
