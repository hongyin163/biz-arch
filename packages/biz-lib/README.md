# `biz-lib`

> 提供API管理库和工具类
## 使用

处理网络请求会产生很多模板代码，并且有拼接url的体验，这里采用声明式方式创建网络API，如下：


```js
const { buildApi } = require('biz-lib');

const apis = buildApi({
    'getJobList': '/job/list?compayId={compayId}',
    'addJob': {
        method: 'POST',
        url: '/job/add/{companyId}'
    }
})

/**
 * 获取职位列表
 * @param {String} compayId 公司ID
 */
export const getJobList = async (compayId) => {
    try {
        let list = await apis.getJobList({ compayId });
        return list;
    } catch (error) {
        console.log(error.message);
    }
};

/**
 * 创建职位
 * @param {*} companyId 公司ID
 * @param {*} data 职位数据
 */
export const addJob = (companyId, data) => {
    return apis.addJob({ companyId }, data)
}

```

## 配置说明

buildApi 接口如下：
```js
buildApi(apis: ISingleApiOptions, option: IApiOption)
```
apis 是网络请求的配置，option 是全局的配置

apis 的配置说明：

```js
interface ISingleApiOption {
    /**
     * 请求的 url
     */
    url: string;
    /**
     * 请求的 method
     */
    method?: 'POST' | 'GET';
    /**
     * 请求的host，可以覆盖全局的配置
     */
    host?: string;
    /**
     * mock 配置，可以覆盖全局的配置
     */
    mock?: (url: string, data: any, option: ISingleApiOption) => void;
    /**
     * 请求之前执行钩子函数，可以覆盖全局的配置
     */
    before?: (url: string, data: any, config: any) => any;
    /**
     * 请求知乎执行钩子函数，可以覆盖全局配置
     */
    after?: (e) => any;
    /**
     * 请求拦截器，可以覆盖全局配置
     */
    filters?: Array<((res: any) => any)>;
    /**
     * 请求缓存，避免二次请求
     */
    cache?: boolean;
    /**
     * 请求合并，同时发起多个请求，合并成一个
     */
    merge?: boolean;
    /**
     * 缓存存储介质设置，默认是内存
     */
    storage?: 'sessionStorage' | 'localStorage' | 'memoryStorage';
    /**
     * http 请求的 content type 
     */
    format?: 'form' | 'json' | 'form-data';
    /**
     * 请求异常处理，可以覆盖全局配置
     */
    onError?: (err) => void;
    /**
     * 跨域请求是否携带 Cookie
     */
    withCredentials?: boolean
}

```
option 配置说明：

```js
interface IApiOption {
    /**
     * 是否开发环境
     */
    isDev?: boolean;
    /**
     * 为接口统一设置域名，未设置使用当前域名
     */
    host?: string;
    /**
     * mock配置，开发环境下会拦截请求，执行mock方法，根据不同的mock系统进行自定义
     */
    mock?: (url: string, data: any, option: ISingleApiOption) => void;
    /**
     * 请求开始之前的钩子函数
     */
    before?: (url: string, data: any, config: any) => any;
    /**
     * 请求结束之后的钩子函数
     */
    after?: (e) => any;
    /**
     * 请求过滤器，可以为请求添加自定义的拦截器，根据不同的响应做自定义处理
     */
    filters?: Array<((res: any) => any)>
    /**
     * 统一的异常处理函数
     */
    onError?: (err) => void;
    /**
     * 请求头自定义
     */
    headers?:object;
    /**
     * 自定义请求库，代替系统默认的请求库
     */
    request?: (option: IRequestOtption) => Promise<any>;
}
```

针对单个api的配置可以覆盖全局的配置

## Mock方法

使用 http://hapi.58corp.com/ 做 mock 系统的，在平台上先建立 api，拿到 apiId，使用方式如下：

```js
const apis = buildApi({
    'submitAnswer': {
        method: 'POST/GET',
        apiId:'60768da182668a0422b31b56',
        url: '/cexam/api/answer/submit'
    },
},{
   mock(url, data, options) {
        if (options.method === 'GET')
            return http.get(`http://apimanage.58corp.com/mock/${options.apiId}`);
        else
            return http.post(`http://apimanage.58corp.com/mock/${options.apiId}`);
    },
});
```
