import CodeError from './code-error';
import { buildHttp } from './http';
import { getOption, setOption } from './options';
import { getMemoStorage, getStorage } from './storage/index';
import { IApiOption, ISingleApiOption, ISingleApiOptions } from './types';
import { debounce, isCompleteUrl, isThenable } from './util';

// 初试话默认HTTP请求库
let HTTP = buildHttp();

/**
 * 过滤器
 * @param {array} filters 
 * 
 * function (res){
 *  return Promise.resolve('x');
 * }
 */
function filterHandler(filters = []) {
    if (filters.length === 0) {
        return arg => arg;
    }
    if (filters.length === 1) {
        return filters[0];
    }
    return filters.reduce((pre, current) => {
        return res => {
            if (isThenable(res)) {
                return res.then(pre).then(current);
            }
            const result = pre(res);
            if (isThenable(result)) {
                return result.then(current);
            }
            return Promise.resolve(result).then(current);
        };
    });
}

function buildUrl(url = '', params = {}, { host }) {
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            url = url.replace(`{${key}}`, params[key]);
        }
    }
    if (!isCompleteUrl(url)) {
        url = (host || '') + url;
    }

    return url;
}

function getFromCache(tarUrl, storage) {
    const store = getStorage(storage || 'memoryStorage');
    const result = store.get(tarUrl);
    let response = null;
    if (result) {
        if (isThenable(result)) {
            response = result;
        } else {
            response = Promise.resolve(result);
        }
    }
    return response;
}

function setToCache(tarUrl, result, storage) {
    const store = getStorage(storage || 'memoryStorage');
    store.set(tarUrl, result);
}

function getFromMemory(tarUrl) {
    const store = getMemoStorage();
    const result = store.get(tarUrl);
    return result;
}

function setToMemory(tarUrl, result) {
    const store = getMemoStorage();
    store.set(tarUrl, result);
}

const clearMergeCache = debounce((tarUrl) => {
    const store = getMemoStorage();
    store.remove(tarUrl);
}, 5000);

const buildFunc = (opt: IApiOption & ISingleApiOption) => {
    return (params, data = {}, extOpt) => {
        const option = Object.assign(opt, extOpt);
        const {
            isDev = false,
            url,
            method = 'get',
            cache,
            merge = false,
            storage = 'memoryStorage',
            before,
            after,
            mock,
            host,
            filters = [],
            onError,
        } = option;

        const tarUrl = buildUrl(url, params, { host });

        // 添加最后一个过滤器，after
        const lastFilter = res => (after(res) || res);
        const handler = filterHandler(filters.concat([lastFilter]));

        let httpFunc = HTTP[method.toLowerCase()];
        // 执行before钩子函数
        before(tarUrl, data, option);

        // 开发模式，启用mock
        if (isDev) {
            if (mock) {
                httpFunc = mock;
            }
        }

        if (cache) {
            const result = getFromCache(tarUrl, storage);
            let response = null;
            if (!result) {
                response = httpFunc(tarUrl, data, option);
                setToCache(tarUrl, response, storage);
            } else {
                response = result;
            }
            return response
                .then(handler)
                .catch(onError);
        }

        if (merge) {
            const result = getFromMemory(tarUrl);
            let response = null;
            if (!result) {
                response = httpFunc(tarUrl, data, option);
                setToMemory(tarUrl, response);
            } else {
                response = result;
            }
            return response
                .then(handler)
                .then((res) => {
                    clearMergeCache(tarUrl);
                    return res;
                })
                .catch(onError);
        }

        return httpFunc(tarUrl, data, option)
            .then(handler)
            .catch(onError);
    };
}

const createGet = ({ isDev, host, mock, headers }) => {
    return function get(url) {
        const targetUrl = buildUrl(url, {}, { host });
        if (isDev && mock) {
            return mock(targetUrl);
        }
        return HTTP.get(targetUrl,{},{ headers });
    };
}

const createPost = (options) => {
    const { isDev, host, mock } = options;
    return function post(url, data, opts) {
        const targetUrl = buildUrl(url, {}, { host });
        if (isDev && mock) {
            return mock(targetUrl, data);
        }
        const opt = Object.assign({}, options, opts);
        return HTTP.post(targetUrl, data, opt);
    };
}

const createJsonp = ({ isDev, host, mock }) => {
    return function jsonp(url, data) {
        const targetUrl = buildUrl(url, {}, { host });
        if (isDev && mock) {
            return mock(targetUrl, data);
        }
        return HTTP.jsonp(targetUrl, data);
    };
}

/**
 * 根据配置的 KEY 以及 传入的 Url 参数清除缓存
 * @param key 配置 KEY
 * @param urlParams Url 参数
 */
const clearCache = (key, urlParams) => {
    const option = getOption(key);
    const {
        url,
        host,
        storage,
    } = option;
    const targetUrl = buildUrl(url, urlParams, { host });
    const store = getStorage(storage || 'memoryStorage');
    store.remove(targetUrl);
};

/**
 * 合并主配置和单个配置
 * @param main 主配置
 * @param single 单个配置
 */
const mergeOption = (main: IApiOption, single: ISingleApiOption | string) => {
    if (typeof single === 'string') {
        single = { method: 'GET', url: single };
    }
    const option = Object.assign({}, main, single);
    return option;
}

/**
 * 根据API配置，创建辅助方法，实现http请求
 * @param {} apis 配置格式如下
 * {
        'getJobList': '/job/list?compayId={compayId}',
        'addJob': {
            method: 'POST',
            format:'json/form',
            url: '/job/add/{companyId}'
        }
    }
 */

export const buildApi = (apis: ISingleApiOptions, option: IApiOption = {}) => {

    const {
        isDev = false,
        host = '',
        mock,
        before = (e) => Promise.resolve(e),
        after = (e) => Promise.resolve(e),
        filters = [],
        onError = err => { throw err },
        request,
        headers
    } = option;

    // 自定义HTTP基础请求库
    if (request) {
        HTTP = buildHttp(request);
    }

    const cfx = {
        get: createGet({
            isDev,
            host,
            mock,
            headers
        }),
        post: createPost({
            isDev,
            host,
            mock,
            headers
        }),
        jsonp: createJsonp({
            isDev,
            host,
            mock,
        }),
        clearCache,
    };
    for (const key in apis) {
        if (!apis.hasOwnProperty(key)) {
            continue;
        }

        const opt = mergeOption({ isDev, before, after, host, mock, filters, onError, headers }, apis[key]);
        // 存储url对应的设置
        setOption(key, opt);

        cfx[key] = buildFunc(opt);
    }
    return cfx;
}

buildApi.CodeError = CodeError;
