# `biz-store`

> 提供 Redux 简化开发库，避免写太多模板代码

## 使用


```js
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
