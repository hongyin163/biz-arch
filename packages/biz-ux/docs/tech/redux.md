
> 团队里一直都在用 Redux 做状态管理，Redux 本身非常轻量，区区上百行代码就实现了一个清晰的状态管理框架，但是围绕 Redux 本身却出现了很多争议，比如需要写大量的 Action 模板代码，需要写很多 switch case 分支判断，Action 和 Reducer 分开写难以维护等等，本文主要是总结项目中如何简化 Redux 开发，提供相关参考思路。

## 问题
典型的 Redux 代码如下：

Action Creator:
```js static
export const SET_TODOS = 'SET_TODOS';
export const setTodos = (list = []) => {
    return {
        type: SET_TODOS,
        list,
    }
}

export const loadTodos = (params) => {
    return async (dispatch, getState) => {
        const todos = await http.get('save/todo');
        dispatch(setTodos(setTodos));
    }
}
```

Reducers:
```js static
import {
    SET_TODOS,
} from './actions'

export const setTodos = (state, list) => {
    return state.set('list', list);
}

export const reduder = (state, action) => {
    switch (action.type) {
        case SET_TODOS:
            return setTodos(state, action.list);
        default:
            break;
    }
}

```
Component:
```js static
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import {
    loadTodos,
} from './actions'
import { connect } from 'react-redux'

export class TodoList extends Component {
    render() {
        const me = this;
        const {
            list = [],
        } = me.props;
        return (
            <div> {list.map((item) => (<div> {item.name} </div>))} </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.get('list'),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadTodos
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
```

总结起来，基于redux开发会遇到一下几个问题：

- 需要写大量的 `Action Creater` 代码，业务复杂的时候，这些 `Action Creater` 维护起来负担很重
- 需要写大量 `switch case` 分支判断，每个子状态的 switch 维护都是不小的负担，特别是 `Action` 很多时
- `Action` 和 `Reducer` 分开书写，维护起来麻烦，虽然初衷是为了解耦，但是在大多数时候是一个 `Action` 对应一个 `Reducer`
- 异步操作，通常可以使用 `thunk` 中间件来做异步，多数时候 `thunk` + `async await` 就可以满足需要，复杂场景可以引入 `saga` 中间件，但是我们一直没有引入 `saga` ， `saga` 对应团队成员也是一个负担，毕竟他带来的很多概念，对新手来说负担太重

针对以上问题，我们需要对 Redux 开发做一些简化，当然也可以放弃 `Redux` ，使用 `MobX` 等状态管理库，他们的优缺点分析这里不多对比，可以参考其他文章。

社区里关于 Redux 简化的一些方案：
- Dva ：引用了 `redux-saga` ，将 `Reducer` 和 副作用（异步等操作）放到同一文件维护，并没有简化定义 `Action` 的工作
- Mirror：通过 `Reduer` 定义反推 `Action`，避免了书写大量 Action 样板代码，这个和我们团队目前做法类似
- react-coat：由于上面两个方案都是将 `Reducer` 和 `Effect` 放到了一个对象内定义，不能很好借助 TS 的类型校验，所以 react-coat 通过 `Class` 的方式组织  `Reducer` 和 `Effect` ，通过装饰器来区分 `Reducer` 和 `Effect`

总结以上的方案，需要做到以下几点：

- 将 `Reducer` 和 `Effect` 放到同一文件维护
- 避免大量的 `Action` 和 、`switch case`、样板代码
- 方便合理划分 `State`
- 可以借助 `Typescript` 的类型系统

## 简化 Action 开发

有两个办法可以简化：

- 由 `Reducer` 反推 `Action` ，避免了书写 `Action`，利用 `Reducer` 函数名作为 Action 的 type ,同时避免了写 `switch case`
- 简化 Action，只提供基础类似 `init`，`update`，`select` 这样的基础 `Action` ，看起来是将 Redux Store 当做 数据库一样，提供基础 API ，调用方通过基础的语句做更新和查询。

### 由 Reducer 反推 Action 

经过简化以后代码如下：


```js static
/**
 * 列表模式
 */
import { createAction } from 'biz-store';
import { Map } from 'immutable';

import {
    getTodos,
} from '../service/todo';

export default createAction({
    name: 'detail',
    reducers: {
        initState: () => {
            return Map({
                list:[],
            });
        },
        setTodos(state, list = []) {
            return state.set('list', list);
        },
    },
    effects: {
        async loadTodos() {
            const list = await getTodos();
            this.setTodos(list);
        },
    },
    selectors: {
        getDoneTodos(){
            const state=this.getSelfState();
            return state.get('list').filter(item=>item.done)
        }
    },
});

```
上面代码和 `Dva` 和 `Mirror` 神似，和 `Mirror` 的思路是一致的，由 `Reducer` 的函数签名反推 `Action` 对象，然后利用 `bindActionCreators` 将 Action 和 dispatch 绑定，effects 中调用的绑定后的方法，所有调用的方法中没有 `state` 参数

上面这种做法总体来说还是很方便简洁的，但是缺点就是 `Reducers` 、`Effects` 等都是包在对象里，调用方法没法知道最后的方法签名，所有 `react-coat` 使用 `Class` 来实现类似的功能。

### 简化 Action

上面的做法没有很好的利用 TS 的类型，所以想要更简洁，同时利用上 TS 的类型，考虑了这个实现。

不再通过 `Reducer` 反推` Action`，而是仅提供基础的 `Reducer` 和 `Action`，让 `Redux Store` 成为底层的存储，为上层提供通用的 API，类似数据库提供了增删改查的命令。

这里提供了 `init`、`update`、`select` 方法，实现状态初始化，更新，查询。

效果如下：
```js static
class TotoAction extends BaseState {
    initState() {
        this.init(Map({
            list: [],
        }))
    }
    public setTodos(list:Task[] = []) {
        this.update('list', list);
    }
    public async loadTodos() {
        const list = await getTodos();
        this.setTodos(list);
    }
    public getDoneTodos():Task[]{       
        return this.select('list').filter(item=>item.done)
    }
}

export default new TotoAction('job')
```

看起来要比之前的代码简洁不少，而且可以使用 TS 类型，也不用使用装饰器来标识那些是 `Reducer` ，哪些是 `Effect`（异步操作）。

当然，不足之处就是，看状态变迁日志，都是 `udpate` 赋值操作 ,业务逻辑都写在上面的方法里了。

## 是否一定需要 connect 注入 Action Method

之前写一个组件，习惯将所有的属性和方法通过 `connect` 注入到组件，通过属性获取，后来发现其实没有必要。

通过 `connect` 注入方法，调用组件拿不到方法的类型信息，为了规范组件，还要额外加上属性的接口定义，但是注入的这些方法只有组件本身会用到，组件的使用方也不会为其赋值，所以，直接在组件内部调用上面的类实例提供的方法就可以，`connect` 只用来注入属性即可。

## 状态如何划分

目前我们的状态划分是这样的，参考 `Dva` ,按页面划分状态字段，这里的页面是指每个路由对应的页面，不是单页应用的页面，所以基本的模式就是：每个页面在 `Store` 中对应一个字段，如果有共享的状态，可以抽出来单独对应一个字段。

## 是否要所有状态都放到 Store

通常的做法，如果没有明显的性能问题，我都是建议放到 `Store` 里，因为 `数据在哪里，业务逻辑就在哪里`，`Store` 就像一个数据库，都放入 `Store`，业务逻辑会集中在业务逻辑层里，而不是分散到各个组件内，这样更易于维护，一般的页面性能是可以接受的。

如果状态分散到组件内，私有状态和共享状态的交织在一起，反而显得乱，如果未来可能有共享的情况，还要抽取出来，这就麻烦了。


## 最后

本文主要讲如何简化 `Redux` 开发，基本上，我们实现了前文提到的目标：

- 将 `Reducer` 和 `Effect` 放到同一文件维护
- 避免大量的 `Action` 和 、`switch case`、样板代码
- 方便合理划分 `State`
- 可以借助 `Typescript` 的类型系统

简化了大量的代码，同时配合 `TS` 的类型系统，系统更加稳健，开发体验很棒。

`Redux` 本身是大道至简的，没有向其他状态管理库提供那么多的特性，但是感觉很棒，很稳，`time travel` 很赞，在性能方面，需要开发者特别留意，不像 `MobX` 等可以做依赖收集，细粒度的更新控制，相比 `MobX` ，`Redux` 显得更暴力，所以要做好组件的更新检查，`react-redux` 对属性做了前后更新对比，只是浅比较，配合 `immutablejs` ，很方便做好状态管理。


参考阅读：
- [阿里前端推出新的 React 框架：Mirror](https://zhuanlan.zhihu.com/p/28643798)
- [Vuex、Flux、Redux、Redux-saga、Dva、MobX](https://zhuanlan.zhihu.com/p/53599723)
- [DvaJS](https://dvajs.com/guide/)
