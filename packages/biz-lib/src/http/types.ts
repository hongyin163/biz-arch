


export interface IHttpOption {
    format?: 'form' | 'json' | 'form-data';
    responseType?: string;// 'json';
    withCredentials?: boolean;// = false;
    headers?: any;// {};
    onSuccess?: (data) => any;
    onError?: (error) => any;
    onProgress?: (progress) => any;
}

export interface IHttp {
    get: (url: string, params?: any, option?: IHttpOption) => Promise<any>;
    post: (url: string, params?: any, option?: IHttpOption) => Promise<any>;
    upload: (url, params?: any, option?: IHttpOption) => any;
    jsonp: (url: string, params?: any) => Promise<any>;
}

export interface IRequestOtption {
    /**
     * 请求类型
     */
    method?: 'GET' | 'POST',
    /**
     * 请求 URL
     */
    url?: string;
    /**
     * 请求数据
     */
    data?: any;
    /**
     * 请求头
     */
    headers?: any;
    /**
     * 响应数据类型
     */
    responseType?: string;
    /**
     * 发送数据的类型
     */
    contentType?: string;
    /**
     * 跨域时，是否携带 Cookie
     */
    withCredentials?: boolean;
    /**
     * 是否跨域
     */
    crossDomain?: boolean;
    onProgress?: (progress) => any;
    /**
     * 是否异步
     */
    async?: boolean;
    /**
     * 使用jsonp方式请求
     */
    jsonp?: boolean;
}

export interface IRequest {
    [x: string]: any;
    request(option: IRequestOtption)
}

export type TRequest = (option: IRequestOtption) => Promise<any>;
