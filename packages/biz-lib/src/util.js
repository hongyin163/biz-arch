export function hashCode(str) {
    let hash = 0;
    if (str.length == 0) { return hash; }
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export function setCookie(name, value, expires, path, domain, secure) {
    let curCookie = `${name}=${escape(value)}${(expires) ? `; expires=${expires.toUTCString()}` : ''}${(path) ? `; path=${path}` : '; path=/'}${(domain) ? `; domain=${domain}` : ''}${(secure) ? '; secure' : ''}`;
    document.cookie = curCookie;
}

export function getCookie(name) {
    let reg = new RegExp(`${name}=([^;]+)`, 'i');
    let matchCookie = document.cookie.match(reg);
    return matchCookie ? decodeURIComponent(matchCookie[1]) : '';
}

export function isIE() {
    let {
        userAgent
    } = window.navigator;
    if (userAgent.indexOf('MSIE') >= 1 || userAgent.indexOf('Trident') >= 1) {
        return true;
    }
    else {
        return false;
    }
}

export function isMobile() {
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}

export function isThenable(thenable) {
    if (thenable && typeof thenable.then === 'function') {
        return true;
    }
    return false;
}


export function toFixed(n, pos = 1, isFloor = true) {
    if (typeof n == 'string') {
        n = Number(n);
    }
    let x = Math.pow(10, pos);
    let num = n * x;
    let temp = isFloor ? Math.floor(num) : Math.ceil(num);
    return temp / x;
}

export function convertSeconds(seconds) {
    let minutes = parseInt(seconds / 60);
    let hour = parseInt(minutes / 60);
    let sec = parseInt(seconds % 60);
    let min = parseInt(minutes % 60);
    hour = hour < 10 ? `0${hour}` : hour;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    return `${hour}.${min}.${sec}`;
}

/**
 * 获取 URL 上对应参数值
 */
export function getQuery(name) {
    let regx = new RegExp(`${name}=([^?&=]+)`);
    let matchs = regx.exec(window.location.search);
    if (!matchs) {
        return '';
    }
    return matchs[1];
}

/**
 * 获取 URL 的参数，返回 Json 对象
 */
export function getQueryParams() {
    var query = {};
    window.location.search.substr(1).replace(/([^?&=]+)=([^?&=]+)/ig,
        function (a, b, c) {
            query[b] = decodeURIComponent(c);
        });
    return query;
}

export function getQueryString(values = {}) {
    let query = Object.entries(values).map(([key, val]) => key + '=' + val).join('&');
    return query;
}

// 判断是否为Array
export function isArray(arr) {
    if (Array.isArray) {
        return Array.isArray(arr);
    }
    return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 * 
 * @param {number} mouseLeft 鼠标距离左侧窗口距离
 * @param {number} mouseTop 鼠标距离顶部窗口距离
 * @param {number} winWidth 窗口宽度
 * @param {number} winHeight 窗口高度
 * @param {string} position 弹出显示位置，topCenter,left
 */
export function caculatePosition(target, winWidth, winHeight, offsetLeft = 0, offsetTop = 0) {
    const pos = target.getBoundingClientRect();
    let { top, left, right, bottom, width, height } = pos;
    const { clientWidth, clientHeight, } = document.body;
    let tarLeft, tarTop;
    if (left < winWidth) {
        tarLeft = left + offsetLeft;
    }
    else if (clientWidth - right < winWidth) {
        tarLeft = right - winWidth - offsetLeft;
    }
    else {
        tarLeft = left - ((winWidth - width) / 2) + offsetLeft;
    }
    if (top < winHeight) {
        tarTop = bottom + offsetTop;
    }
    else if (clientHeight - bottom < winHeight) {
        tarTop = top - winHeight - offsetTop;
    }
    else {
        tarTop = bottom + offsetTop;
    }
    return {
        top: tarTop,
        left: tarLeft
    };
}

export function debounce(fn, delay) {

    let timer = null;

    return function () {
        let args = arguments,
            context = this;
        if (timer) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        }
    };
}

export function throttle(fn, delay) {
    let timer = null,
        remaining = 0,
        previous = new Date();

    return function () {
        let args = arguments,
            context = this;
        let now = new Date();
        remaining = now - previous;

        if (remaining >= delay) {
            if (timer) {
                clearTimeout(timer);
            }

            fn.apply(context, args);
            previous = now;
        } else {
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    previous = new Date();
                }, delay - remaining);
            }
        }
    };
}

export function isEmpty(value) {
    if (typeof value === 'undefined' || value === null) {
        return true;
    } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return !value;
        }
    } else if (typeof value === 'string') {
        return !value;
    }
    return false;
}

function isUndefined(value) {
    return typeof value === 'undefined';
}


function downloadStreamByATag(data, suffix = 'xls', name = '导出文件') {
    if (data.type) {
        const blob = new Blob([data]);
        const fileName = `${name}.${suffix}`;
        if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
        }
    }
}

/**
 * url 参数处理
 */
export function paramsString(param) {
    return encodeURIComponent(JSON.stringify(param));
}

const httpRegx = new RegExp(/^http|^\/\//);
export function isCompleteUrl(url) {
    return httpRegx.test(url);
}

export default {
    hashCode, setCookie, getCookie, isIE, isMobile, isThenable, toFixed, convertSeconds,
    getQuery, isArray, caculatePosition, debounce, throttle, isEmpty, isUndefined,
    getQueryString, getQueryParams, paramsString, downloadStreamByATag,isCompleteUrl
};
