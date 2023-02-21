import { IRequestOtption } from './http/types';
export interface IApiOption {
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

export interface ISingleApiOption {
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

export interface ISingleApiOptions {
    [x: string]: ISingleApiOption | string;
}

export interface IHttpOption {
    format?: 'form' | 'json' | 'form-data';
}

export interface IBuildApiResult {
    /**
     * 请求接口
     * @param urlParms url参数
     * @param data 数据
     * @param option 调用该接口可以覆盖默认的配置
     */
    [x: string]: (urlParms?: {}, data?: {}, option?: ISingleApiOption) => any;
    /**
     * 基础的 get 请求
     */
    get: (url, params?: {}) => any;
    /**
     * 基础的 post 请求
     */
    post: (url, params?: {}, option?: IHttpOption) => any;
    /**
     * 基础的 jsonp请求
     */
    jsonp: (url, params?: {}) => any;
    /**
     * 清除接口的缓存数据
     */
    clearCache: (key, params?) => void;
}
