## 组件仓库


组件库在 `packages/biz-ux` 目录下

`biz-ux` 库本身有自己的git仓库：


在 `biz-arch` 项目下，开发测试，通过 `git subtree` 命令，将代码同步到 `biz-ux` 仓库。



## 组件目录

所有组件放到 `components` 目录下，遵守如下规范：

* 文件夹名称小写，中划线 - 分割，格式：<组件名>-<特性> 
* 组件目录内包括：
    + index.tsx 组件入口
    + types.ts 组件属性接口定义
    + style 组件样式，index.less 作为入口
    + readme.md 组件文档，可以书写组件示例，不支持自动提示,可以在 在 demo 页写好后拷贝到文档里
    + introduce.md 组件相关的文章，记录组件的设计、实现
    + demo 组件的示例，入口是 index.tsx ,组件开发调试的入口
    + __test__ 单测用例
* 组件的公用组件放到 `components/_common` 目录内
* 组件公用的基础库放到 `components/_util` 目录内
* 组件样式公共资源在 `components/style` 目录内
    + fonts 字体文件
    + themes 组件主题，包含 less 变量

目录 `template/component` 存放的是个标准组件的目录结构，可以作为参考

## 组件样式

组件需要支持主题，所以涉及到主题色，需要引用主题中的变量，比如：

```scss
@primary-color : @green-6;
@info-color : @green-6;
@success-color : @green-6;
@processing-color : @green-6;
@error-color : @red-6;
@highlight-color : @red-6;
@warning-color : @gold-6;
@normal-color : #d9d9d9;
```

其他的变量根据需要添加，可以在开发组件时，将需要修改的变量在 less 文件定义好，然后拷贝到主题文件。

主题中的变量目前是借用 `antd` 的，作为参考，开发完成以后，替换成自己的。

## 组件入口配置

目前没有做入口文件自动生成，如果要生成入口文件，组件的目录就要遵守规范。

暂时手动入口，在根目录的 index.js 里加入组件的入口和导出变量名，例如：

``` js static
import Input from './components/input';
import './components/input/style/index.less';

export {
    Input
}
```

## 组件文档

* 组件的的属性定义要写注释，例如：

```typescript static
export interface IBaseButtonProps {
    /**
     * 按钮大小
     */
    size?: 'small' | 'large' | 'default';
    /**
     * 按钮对应的 HTML button 的 type 类型
     */
    htmlType?: 'button' | 'reset' | 'submit';
    /**
     * 按钮类型，primary 主按钮，minor 次按钮，danger 警告按钮
     */
    type?: 'primary' | 'minor' | 'danger';
    /**
     * 为按钮附加的 className
     */
    className?: string;
    /**
     * 按钮内的子节点，可以是文本或者其他组件
     */
    children?: React.ReactNode;
    /**
     * 按钮点击事
     */
    onClick?: (event: React.MouseEvent) => void,
    /**
     * 按钮是否可用
     */
    disabled?: boolean,
    /**
     * 为按钮附加的 style 样式
     */
    style?: React.CSSProperties,
}

```

复合类型，直接列出可选项，比用单独抽出一个类型，比如上面的 type 属性，直接列出，方便文档系统显示可选项。

* 为组件添加 `defaultProps` 静态属性
* 文档书写中英文与中文之前要有一个空格，例如：`按钮类型，primary 主按钮，minor 次按钮，danger 警告按钮`
* 文档中的图片放到 `static/img` 目录，`static`  目录是静态资源根目录，文档的图片链接相对于根目录配置，例如： `//img/<分类>/<图片.png>`
* 文档嵌入代码支持如下语言：clike, markup, xml, html, mathml, svg, markdown, md, css, scss, javascript, js, flow, typescript, ts, jsx, tsx, graphql, json, bash, shell, diff

## 组件测试

* 单测使用 jest 框架，单测相关用例放到 `__test__` 目录
* 开发过程测试，运行 `npm run dev <name>`，启动测试页面，可以自己写个 demo ，在 `demo` 目录写测试代码，测试组件  

## 组件开发思路总结

* 优先定义接口，可以参考 `antd` 的接口设计，接口中的功能未必要一次完全开发完，未完成的接口在注释中加入 `@todo` 标记
* 接口变更，如果接口被废弃，加入 `@deprecated` 标记，做好接口向后兼容
* 组件的 `state` 接口，最好也定义，增强组件的代码质量，根据经验，是有很大益处的


## 组件发布

首先执行`npm login `，登录 `npm`。

* 构建，执行`npm run build`，注意检查es和lib目录，是否生成了.d.ts文件
* 修改版本号
* 执行 `npm publish`

注意问题：
* 发布 `npm` 偶尔有超时的情况，考虑换个网络环境

## 文档开发

文档系统使用 `styleguidist` 开发，文档编写、预览使用如下命令：

```bash
npm run doc:dev
```

在组件的 readme.md 文档里写组件的示例文档，支持在 markdown 内嵌入示例代码，可以实现组件预览和代码展示，参考已经编写的组件文档。

## 文档发布
* 在 `biz-arch` 下执行 `npm run pull:biz-ux`,同步代码，然后执行 `npm run push:biz-ux`,推送代码到 `biz-ux` 库
* 登录 `arthurci` 系统
* 进入构建页面：http://corp.com/node-build?id=381&branch=master
* 启动构建
* 构建完成后，点击右侧`送测`
* 进入`集群管理`，点击 `chr_node_bizui`
* 进入`版本管理`，查看新构建的版本状态，结果变成 `Success` 以后部署测试
* 进入`测试环境`，点击部署，选择构建的版本，测试环境部署后，测试没有问题，点击`测试通过`
* 可以部署沙箱和稳定环境，一般不需要
* 进入`正式环境`，点击`滚动升级`
* 升级结束后，进入：http://10.144.64.195:8001/，查看发布是否成功
