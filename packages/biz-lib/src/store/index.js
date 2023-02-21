import { connect as reactReduxConnect, createProvider } from 'react-redux';
import { bindActionCreators, combineReducers } from 'redux';
import configStore from './configStore';
/**
 * 最好针对不同的业务划分store，不用把所有的业务写在一个store里
 */
const Store = configStore((state) => state);

export default Store;

/**
 * 自定义的Provider，在context内注册名称为editor_store的store对象
 */
export let Provider = createProvider('cv_store');

/**
 * 和上面的Provider配套的connect，从context中获取名为editor_store的store对象进行订阅
 */
export function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    return reactReduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, {
        storeKey: 'cv_store',
    });
}

/**
 * 根据reducer创建action，不需要写action了，去除样板代码
 * @param {*} reducers 
 */
function buildActionCreators(reducers, name) {
    const actions = {};
    for (const key in reducers) {
        actions[key] = (function (key) {
            return function () {
                return {
                    type: `@${name}/${key}`,
                    params: [].slice.call(arguments),
                };
            };
        })(key);
    }
    return actions;
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
    return function index(state = reducers.initState() || Map({}), action) {
        if (!allReducer[action.type]) {
            return state;
        }
        return allReducer[action.type](state, ...action.params);
    };
}

let reducerLast = {};
const actions = {};
/**
 * 根据配置文件，创建action对象，绑定Store上下文
 * @param {stirng} name 区分不同业务模块，state用该名称的属性存储该业务的state
 * @param {*} cfx 配置，包括reduers和effects
 */
export function createAction({ name, reducers, effects, selectors }) {
    const reuder = {
        [name]: createReducer(reducers, name),
    };
    reducerLast = Object.assign(reducerLast, reuder);

    Store.replaceReducer(combineReducers(reducerLast));

    const actionCreators = buildActionCreators(reducers, name);

    const actionFuncs = bindActionCreators(actionCreators, Store.dispatch);

    const retObj = {
        getState: Store.getState,
        getSelfState () {
            return this.getState()[name];
        },
        actions,
        ...actionFuncs,
        ...effects,
        ...selectors,
    };

    for (const key in retObj) {
        if (typeof retObj[key] == 'function') {
            retObj[key] = retObj[key].bind(retObj);
        }
    }
    Object.assign(actions, {
        [name]: retObj,
    });

    return retObj;
}

export { actions };
