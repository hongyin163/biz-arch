# `biz-cli`

> 脚本工具，集成了创建项目脚手架，构建，发布项目等功能

## 使用

```
npm -g i biz-cli

biz --help
biz --version

```

- -init : 初始化项目脚手架，包括 src 目录以及配置文件。

```
biz init
```

- add : 创建项目内的子模块，在 src 内创建对应的文件夹，以及相关基础目录。

```
biz add --name <sub-module-code> 
biz add --name job
```

- build : 构建项目，可以全部构建，可以指定子模块的编码，单独构建。

```
biz build --name <code>
biz build --name job
```

- dev ：启动本地开发模式，可以全部构建，也可以单独指定子模块构建调试。

```
biz dev --name <code>
biz dev --name job 
```

- -commit ：提交代码到当前分支，提供 commit 的前缀供用户选择，包括 feat、fix、doc等
```
biz commit --m <message> 

```

- tag ：提供当前分支打标签功能
```
biz tag --m <message> 

```
