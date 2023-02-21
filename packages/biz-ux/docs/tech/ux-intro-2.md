# BizUX 组件库开发总结（二）

> 前一篇里主要说了为什么要开发自有组件库，还有组件开发的思路，指导思想，万事开头难，这篇主要是想说下如何启动项目，项目结构设计方面的一些总结。

## 项目结构设计

组件库项目一般是单独的一个项目，有单独的仓库，有自己的开发、构建、发布流程，但是在开发初期，如果单独建立一个项目，单独构建发布，这个开发流太繁琐，不能及时响应，所以就有了下面的问题：

- 如何让多个项目共享一个项目？
- 怎么做到及时更新？

多个项目共享一个项目，方法是蛮多的，主要是：

- git submodule
- git subtree
- npm

上面三个方案，都能做到项目共享，npm 主要是侧重包的依赖管理，但是发布 npm 包成本太高，发布后需要关联项目重新安装，不适合初期的开发，初期代码更新很频繁，所以不适合使用 npm ，后期组件库趋于稳定，各个项目再切换到 npm 来使用组件库。

`git submodule` 和 `git subtree` 类似，借助 git 共享一个项目，没有依赖管理功能，更新拉取代码比较方便，适合初期使用。

我们使用了 `gitsubtree` ，好处是子项目和父级项目是一体的，对开发者来说可以当成一个项目，代码同步命令相比 `git submodule` 更简洁。


添加 git 子项目：

```bash static
git remote add <name> <git 仓库地址>
git remote add biz-ux <git 仓库地址>
```

添加 subtree 子项目：
```bash static
git subtree add --prefix=sub/directory <name> <branch>
git subtree add --prefix=packages/biz-ux biz-ux master
```

拉取代码和提交代码示例：
```bash static
git subtree pull --prefix=packages/biz-ux biz-ux master

git subtree push --prefix=packages/biz-ux biz-ux master
```

## 利用 wepack 别名定位组件目录

初期并没有利用 npm 仓库，组件目录定位可以使用 webpack 别名。

webpack 别名配置：

```js static
resolve: {
    alias: {
        'biz-ux': resolve('packages/biz-ux')
    }
},
```

组件引用：
```js static
import { Checkbox } from 'biz-ux';
```

或者，使用软链接定位，参考 `npm link` ，相对 webpack 别名，`npm link` 要额外执行一些命令，有些麻烦。

## 利用 lerna 做多包管理

摘抄一段 lerna 的介绍：

>Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

项目初期应该是不需要用到 lerna，lerna 主要是方便管理多个 npm 包，初期是通过 git 共享仓库，并没有发布 npm。

后期组件库稳定后，可以新建一个项目，利用 lerna 将组件库，以及组件相关的包做统一管理，利用 lerna 方便维护包的版本和包之间的依赖。

lerna 提供了一系列的命令辅助包管理，包括：

- lerna publish ：发布 npm 仓库，不发布 `package.json` 中 `private：true` 的库
- lerna version
- lerna bootstrap ：启动项目，安装依赖，建立包之间的软连接
- lerna list：列出所有的包
- lerna changed
- lerna diff
- lerna exec ：每个包下执行这脚步命令 `lerna exec -- rm -rf ./node_modules`
- lerna run ：每个包下运行 npm script `lerna run build`
- lerna init ：项目初始化
- lerna add ：为包添加依赖，利用 `--scope=<pkg name>` 指定包
- lerna clean ：移除所有包的 `node_modules` 目录
- lerna import 
- lerna link ：建立包间软连接
- lerna create：创建一个新的包

具体使用参考： [https://github.com/lerna/lerna](https://github.com/lerna/lerna)

## 小结

本文主要组件开发过程中项目结构的设计相关内容，前期主要是利用 `git subtree` 共享组件库项目，因为需要频繁的更新，所有不太适合发布到 `npm` 仓库，后期组件库文档以后，单独创建一个 `monorepos` 仓库，利用 `lerna` 维护组件库以及相关依赖的包。

[组件库开发总结（一）](https://zhuanlan.zhihu.com/p/83582818)
