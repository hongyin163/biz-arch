# biz-arch

biz-arch 解决方案，包括 BizUX组件库、Redux 简化框架、API 开发简化框架、Cli等。

- [BizUX 组件库]
- [Redux 简化框架]
- [API 开发简化]

## 启动

全局安装 lerna

```bash
npm i lerna -g
```

执行

```
lerna bootstrap
```

安装依赖，建立项目间软链接，(bootstrap 命令说明)[https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme]

## 开发组件

切到在biz-ux目录下：

执行

```
npm run dev <name>
```

## 构建

执行

```
lerna run build 
```

## 发布到NPM

### 统一发包

发布到npm之前先要进行构建！

进入biz-arch根目录执行:
```
lerna run build
```

然后发布到 npm 仓库，需要登录 npm 仓库，然后执行发布。

发布：

```
lerna publish
```

选择新版本，然后发布。

#### ️注意

统一发包（在根目录下执行lerna publish）会将其他依赖这个包的版本也更新到最新版本。

如果只是小版本的更新，单独发包就行。

版本号直接选择就行


### 单独发包

单独发包，需要进入到对应的包根目录下。

例如：

```
cd packages/biz-ux
```

构建：

```
npm run build 
```

发布：

```
npm publish
```

#### ️注意

单独发包时，进入对应的目录下，改版本（手动修改），然后构建，使用npm publish单独发布此包
