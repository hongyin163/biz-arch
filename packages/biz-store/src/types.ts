
export interface IStateBase {
    name: string;
    init(): object;
    update(fieldName, fieldValue): void;
    select(fieldName): any;
}

export interface IBuildActionConfig {
    /**
     * 定义全局状态的字段名
     */
    name: string,
    /**
     * 定义reducers
     */
    reducers: {
        [x: string]: (...args) => any,
    },
    /**
     * 定义副作用，包括异步请求处理
     */
    effects?: any,
    /**
     * 状态查询函数封装
     */
    selectors?: any,
}

export interface IBuildActionOptions {
    store?: any;
}
