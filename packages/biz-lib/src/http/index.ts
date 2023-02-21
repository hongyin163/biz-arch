import ajax from './ajax';
import { IHttp, TRequest } from './types';


let REQ;

const FORMAT = {
    'form': 'application/x-www-form-urlencoded',
    'json': 'application/json',
    'form-data': 'multipart/form-data'
};

function addRandom(url) {
    //加随机数，避免缓存
    let v = (Math.random() * 1000000).toFixed(0);
    if (url.indexOf('?') > 0) {
        url += `&_v=${v}`;
    } else {
        url += `?_v=${v}`;
    }
    return url;
}

function convertParamsToString(value) {
    const type = typeof value;
    if (type === 'undefined') {
        return '';
    } else if (type === 'object') {
        return encodeURIComponent(JSON.stringify(value));
    } else if (type === 'string') {
        return encodeURIComponent(value);
    }
    return value;
}

function getValueByFormat(data, format) {
    if (format == 'json') {
        return JSON.stringify(data);
    } else if (format == 'form') {
        let dataStr = '';
        for (const key in data) {
            let val = data[key];
            if (dataStr.length == 0) {
                dataStr = `${key}=${convertParamsToString(val)}`;
            } else {
                dataStr += `&${key}=${convertParamsToString(val)}`;
            }
        }
        return dataStr;
    } else if (format == 'form-data') {
        const formData = new FormData();
        if (data) {
            Object.keys(data).map(key => {
                formData.append(key, data[key]);
            });
        }
        return formData;
    }
    return '';
}

const http: IHttp = {
    get(url, params = {}, option = {}) {
        let { responseType = 'json', withCredentials = false, headers = {} } = option;
        return REQ.request({
            method: 'GET',
            url: addRandom(url),
            data: params,
            responseType,
            headers,
            crossDomain: true,
            withCredentials, //默认情况下，标准的跨域请求是不会发送cookie的
        }).then((res: any) => res.data);
    },
    post(url, params = {}, option = {}) {
        let { format = 'json', responseType = 'json', withCredentials = false, headers = {} } = option;
        let header = {
            'Accept': 'application/json',
            ...headers
        };

        return REQ.request({
            method: 'POST',
            url: addRandom(url),
            data: getValueByFormat(params, format),
            headers: header,
            responseType,
            contentType: FORMAT[format],
            withCredentials
        }).then((res: any) => res.data);
    },
    upload(url, params = {}, {
        format = 'form-data',
        responseType = 'json',
        withCredentials = false,
        headers = {},
        onSuccess,
        onError,
        onProgress
    },
    ) {
        let header = {
            'Accept': 'application/json',
            ...headers
        };
        return REQ.request({
            method: 'POST',
            url: addRandom(url),
            data: getValueByFormat(params, format),
            headers: header,
            responseType,
            withCredentials,
            onProgress,
        }).then((res: any) => {
            onSuccess && onSuccess(res.data);
            return res.data;
        }).catch((error) => {
            onError && onError(error);
        });
    },
    jsonp(url, params = '') {
        let tarUrl = url;
        let paramStr = getValueByFormat(params, 'form');
        if (url.indexOf('?') >= 0) {
            tarUrl += `&${paramStr}`;
        } else {
            tarUrl += `?${paramStr}`;
        }
        return REQ.request({
            url: tarUrl,
            method: 'GET',
            jsonp: true,
        });
    }
};
export default http;

export const buildHttp = (request?: TRequest) => {
    if (request) {
        REQ = { request }
    } else {
        REQ = ajax;
    }

    return http;
}
