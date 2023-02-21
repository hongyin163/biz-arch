
export default function jsonp(url: string, callback: () => any): Promise<any> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            return resolve();
        }
        let doc = document;
        let name = `_jsonp_calback_${parseInt((Math.random() * 10000) + '')}`;
        window[name] = (function (name) {
            return function () {
                callback && callback.apply(null, arguments);
                resolve && resolve.apply(null, arguments);
                delete window[name];
                doc.head.removeChild(doc.getElementById(name));
            };
        })(name);
        if (url.indexOf('?') >= 0) {
            url += `&callback=${name}`;
        } else {
            url += `?callback=${name}`;
        }
        let script = doc.createElement('script') as any;
        script.id = name;
        script.src = url;
        script.async = true;
        let supportOnload = 'onload' in script;

        if (supportOnload) {
            script.onload = onload;
            script.onerror = function (err) {
                onload(err);
            };
        }
        else {
            script.onreadystatechange = function () {
                if (/loaded|complete/.test(script.readyState)) {
                    onload(null);
                }
            };
        }
        function onload(err) {
            reject(err);
        }
        doc.head.appendChild(script);
    });
}
