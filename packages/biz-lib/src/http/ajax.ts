import { IRequest } from './types'
import jsonp from './jsonp';

class NetworkError extends Error {
    status: any;
    statusText: any;
    constructor(status, statusText) {
        super(statusText ? `${statusText}(${status})` : '网络通信异常，请检查您的网络连接');
        this.status = status;
        this.statusText = statusText;
    }
}


/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
const XHR: IRequest = {
    formDataRegx: /FormData/,
    createStandardXHR: function () {
        return new XMLHttpRequest();
    },
    createIEXHR: function () {
        return new (<any>window).ActiveXObject('Microsoft.XMLHTTP');
    },
    createErrorXHR: function () {
        alert('Your browser does not support XMLHTTP.');
        return null;
    },
    createXHR: function () { //创建XMLHttpRequest对象
        let xhr = null;
        if (window.XMLHttpRequest) {
            this.createXHR = this.createStandardXHR; // Firefox, Opera 8.0+,Safari，IE7+
        } else {
            this.createXHR = this.createIEXHR; // IE5、IE6
        }
        try {
            xhr = this.createXHR();
        } catch (e) {
            this.createXHR = this.createErrorXHR;
            xhr = this.createXHR();
        }
        return xhr;
    },
    prepareHeaders(opts) {
        let defaultHead = {
            'Accept': 'application/json',
        };
        if (opts.contentType) {
            defaultHead['Content-Type'] = opts.contentType;
        }
        return Object.assign(defaultHead, opts.headers);
    },
    request: function (opts) {
        if (opts.jsonp) {
            return jsonp(opts.url, null);
        }

        let me = this,
            xhr = me.createXHR(),
            ajaxMethod = (opts.method || 'GET').toUpperCase(),
            isPost = ajaxMethod == 'POST',
            headers = me.prepareHeaders(opts),
            data = me.param(opts.data, headers),
            url = me.buildUrlParam(opts.url, data, isPost),
            responseType = opts.responseType || 'json',
            onProgress = opts.onProgress;

        xhr.open(ajaxMethod, url, opts.async == undefined ? true : opts.async);
        xhr.responseType = responseType;
        // IE 下responseType为只读
        xhr.responseType2 = responseType;

        xhr.withCredentials = opts.withCredentials;

        for (const key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        return new Promise(function (resolve, reject) {
            let stateChange = me.xhrStateChange;
            xhr.onreadystatechange = function () {
                stateChange(xhr, function (response) {
                    resolve(response);
                }, function (xhr, statusText, status) {
                    reject(new NetworkError(status, statusText));
                });
            };
            if (onProgress) {
                xhr.upload.onprogress = onProgress;
            }
            xhr.send(isPost ? data : null);
        });
    },
    buildUrlParam: function (url, data, isPost) {

        if (data && !isPost) {
            if (url.indexOf('?') < 0) {
                url += `?${data}`;
            } else {
                url += `&${data}`;
            }
        }
        return url;
    },
    isFormData(data) {
        return this.formDataRegx.test(Object.prototype.toString.call(data));
    },
    param: function (data: any = '') {
        if (!data) {
            return null;
        }

        if (typeof data !== 'object') {
            return data;
        }

        if (this.isFormData(data)) {
            return data;
        }

        let postData = [];
        for (let key in data) {
            postData.push(`${key}=${data[key]}`);
        }

        return postData.join('&');
    },
    xhrStateChange: function (xhr, successFn, failFn) {
        if (xhr.readyState == 4) { // 4 = "loaded"
            if (xhr.status == 200) { // 200 = OK

                let responseType = xhr.responseType;
                let responseData = !responseType || responseType === 'text' ? xhr.responseText : xhr.response;
                if (!xhr.responseType && xhr.responseType2 == 'json') {
                    responseData = JSON.parse(xhr.response);
                }
                successFn({
                    data: responseData,
                    statusText: xhr.statusText,
                    status: xhr.status
                });
            } else {
                failFn.call(this, xhr, xhr.statusText, xhr.status);
            }
        }
    }
};

// export default function ajax(opts) {
//     return XHR.ajax(opts);
// }

export default XHR;
