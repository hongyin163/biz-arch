# BizUX 组件库开发总结（一）

>最近项目告一段落，有时间总结一下，这个项目比较大，也靠着这个项目沉淀了一套组件库，之前一直使用 `ant design` ，因为之前的项目对设计没有那么要求，所以之前用 `ant design` ，只是改改主题色，新项目启用了设计，出来一套设计规范，所以，我们也就开始了构建自己的组件库

## 为什么要开发自有组件库

前文说了，我们之前是一直用 `ant design` 组件库，丰富、好用的组件库很大提升了我们的开发效率，一度以为，我们不需要开发自己的组件库了， 因为 `ant design` 太优秀了，自己做了，也未必如他做得好，所以我们尽量是使用  `ant design` ,其他不满足需求的另行开发。

但是，产品经理对新项目寄予厚望，对产品的交互要求比较高，找 UI 重新设计了系统，出了一套 UI 设计规范，虽然可以基于  `ant design` 来实现，但是要对 `ant design` 打各种补丁，比如样式覆盖，这个是我们不能忍受的，既然有设计规范，那我们就自己开发一套组件库吧。

另外， `ant design` 也不是一点儿问题没有，比如大组件问题，单个组件承载的功能太多，比如 `Select`、`Table` 等组件，功能丰富、复杂，但是我们都用不到，但是打包的时候占了很大的空间，如果组件的粒度小点儿，组件职责可以单一或许更好。

还有，如果没有相关的项目机会，纯粹为了做组件库而启用各种资源，也是很难的，比如 UI 设计资源、开发时间、组件库推广等等，随着项目开发推进，组件库也会不断完善、稳定、成熟，项目上线后，还有很多考验，比如组件的性能，兼容性等等。

最后，开发一套组件库对我们的技术成长肯定是有帮助的，为了更好的实现，还要去了解现有的解决方案，比如看看 `ant design` 的源码，发现现有方案的痛点，寻找办法解决，这个是很好的锻炼，晋级的时候可以说说某些组件的设计与实现，给自己加点料。

## 设计规范

本来不想说设计规范，设计规范是我们的弱项，`ant design` 或者 `material design` 被描述成一套设计规范、设计语言，站得层面比较高，给出了设计原则、规范、实现。

`ant design` 官网：
> 服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。

`material design` 官网：
> Material is a design system – backed by open-source code – that helps teams build high-quality digital experiences

我们的设计规范？产出自己的设计规范？

> 要产出这样一个规范，其实我们不太懂，最终还是决定借用 `ant design` 的设计规范

 `ant design` 官网上实现  `ant design` 设计规范的组件库还是不少的，比如还有基于 `vue` `angular` `ember` 的实现。

## 组件库的开发思路

开发组件的时候，我们常提醒自己，虽然是重复造轮子，但是要站在巨人的肩膀上，我们借用了 `ant design` 的设计规范和 `API` ，但是如果实现和 `ant design` 一样或者不如他，那也是没什么意义，好的地方要借鉴，不要闭门造车。

了解 `ant design` 实现某个组件的过程，是一个寻宝的过程，会不断的从 `ant design` 里 get 到新的技能，虽然之前经常用，但是估计多数同学也是赶时间，不会去看他的实现吧。

我们梳理了一下开发思路，主要有以下几个方面：
1. 粒度小，强调单一职责
2. 低耦合，避免依赖过多
3. 基于 antd 的 api 设计
4. 使用 Typescript 实现

### 粒度小，强调单一职责

强调组件的边界，不能因为需求不断增多，就在一个组件上不断累加新功能，到最后，组件功能很多，很复杂，但是也变得很难维护。

### 低耦合，避免依赖过多

既然强调粒度小，所以有些组件是靠小组件组合而成的，如果一个组件依赖的组件越来越多，这个组件也就不那么稳定了，因为任何一个依赖组件的改动，都有可能会影响到这个组件，过多的依赖，也让组件难以维护，必要的时候，需要单独的实现，强调可维护性和稳定性。

### 基于 antd 的 API 设计

`ant design` 的受众广泛，也包括我们自己，如果能直接使用他的 `API` 设计，组件的使用上手就很快了，有些组件，可以之间相关替换，无缝切换。

基于 `ant design` 的 `API` 提升了开发效率，因为不用思考对外接口的设计，毕竟给属性和事件起名是个技术活^^

### 使用 Typescript 实现

`TS` 的好处就很多了，最大的好处就是类型校验，做好属性接口设计，界定组件的边界，组件的稳定性也得到保证，使用方有自动提示，很方便使用。

时间原因，先写到这，后续再补充，后续想写的内容：
- 开发规范
- 样式分离，支持主题
- 多语言
- 单元测试
- 文档和示例
- 构建和发布


## 小结：

文中主要说了为什么要开发自有组件库，以及关于设计规范的想法，业务线内很多前端团队都在开发自己的组件库，其实大家都有这个想法的。

涉及到组件库内容还是不少，想一次写完不太可能，所以写多少就发多少，而且长文对阅读并不友好，很多情况下都是先收藏了，后面再读，所以尽量文章的粒度也小些，不会压力太大，写文章总结的对我们团队也是有好处，有些点也是写的时候才想到。

组件内的两个组件专栏内也有介绍：
- [基于 React 的滚动条方案](https://zhuanlan.zhihu.com/p/73489367)
- [基于React实现高度简洁的Form表单方案](https://zhuanlan.zhihu.com/p/72621642)

如果有哪些觉得不对的地方也可以在评论区提出来，多谢点赞支持和讨论。
