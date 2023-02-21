import { bindActionCreators, combineReducers } from 'redux';
import Store from './store';
import { IBuildActionConfig, IBuildActionOptions } from './types';
/**
 * 根据reducer创建action，不需要写action了，去除样板代码
 * @param {*} reducers 
 */
function buildActionCreators(reducers, name) {
    const acts = {};
    for (const key in reducers) {
        if (reducers.hasOwnProperty(key)) {
            acts[key] = ((k) => {
                return (...params) => {
                    return {
                        type: `@${name}/${k}`,
                        params,
                    };
                };
            })(key);
        }
    }
    return acts;
}

/**
 * 根据reducer对象创建reducer函数
 */
function createReducer(reducers, name) {
    const allReducer = Object.keys(reducers).reduce((pre, key) => {
        return Object.assign(pre, {
            [`@${name}/${key}`]: reducers[key],
        });
    }, {});
    return function index(state = reducers.initState() || {}, action) {
        if (!allReducer[action.type]) {
            return state;
        }
        return allReducer[action.type](state, ...action.params);
    };
}

// const actions = {};
/**
 * 根据配置文件，创建action对象，绑定Store上下文
 * @param {stirng} name 区分不同业务模块，state用该名称的属性存储该业务的state
 * @param {*} cfx 配置，包括reduers和effects
 */
export default function createAction({ name, reducers = {}, effects = {}, selectors = {} }: IBuildActionConfig, options: IBuildActionOptions = {}) {
    const reuder = {
        [name]: createReducer(reducers, name),
    };

    const st = options.store || Store;

    st.reducerLast = st.reducerLast || {};
    st.actions = st.actions || {};
    st.reducerLast = Object.assign(st.reducerLast, reuder);

    st.replaceReducer(combineReducers(st.reducerLast));

    const actionCreators = buildActionCreators(reducers, name);

    const actionFuncs = bindActionCreators(actionCreators, st.dispatch);

    const retObj = {
        getState: st.getState,
        getSelfState() {
            return this.getState()[name];
        },
        actions: st.actions,
        ...actionFuncs,
        ...effects,
        ...selectors,
    };

    for (const key in retObj) {
        if (typeof retObj[key] === 'function') {
            retObj[key] = retObj[key].bind(retObj);
        }
    }
    Object.assign(st.actions, {
        [name]: retObj,
    });

    return retObj;
}
