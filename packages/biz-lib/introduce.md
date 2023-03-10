---
tags:
  - build-api 
---
# 如何简化网络请求接口开发

日常开发中，需要大量和后端对接接口，很容易写出大量的模板代码，比如把对接口的请求放到组件内，或者虽然有数据访问层，但是有大量 `get`，`post` 方法的调用，传参的字符串拼接，异常处理等等，有些逻辑是可以通过请求拦截来处理的，有些可以通过配置得到简化，本文是对这个过程的一个实践和总结。

## 面对的问题

首先，明确下我们要解决什么问题，因为说到网络请求调用，使用 `axios` 库就可以了，上手简单，提供请求拦截功能，大多数场景都可以覆盖到，为什么要再去做额外的开发？

 `axios` 做基础的库可以满足日常开发需要，不过出于架构设计、复用和便于维护的需要，通常我们会进行分层，抽出一个数据访问逻辑层，专门去处理和后端的接口访问，这个层对上层提供清晰可读性好的接口，便于对数据进行聚合裁剪。

 在这个数据访问逻辑层，通常会调用 `axios` 或者其他的库进行接口的访问，通常会有如下的场景，需要我们处理：

 1. 请求拦截，比如异常处理，包括网络异常、服务器端异常、登录超时等，或者要做全局 `Loading` 显示等
 2. 请求缓存，对于不变的数据可以缓存到内存，或者本地存储，后续不再发起新的请求
 3. `Mock` 数据，因为这个层对上层提供清晰的接口，可以在这一层做 `Mock`，`Mock` 的方式可以自己组装数据，或者将请求重定向到 `Mock` 服务器
 4. 请求合并，这个需求可能用的比较少，比如在某些需求下，有两个组件公用一个接口，但是两个组件又相互独立，又没有共享数据状态，如果两个组件刚好在一个页面，就会导致页面加载时同时发出两个相同的请求，如何合并两个请求呢？
 5. 安全检查，某些接口对安全要求比较高，需要对数据进行检查、防止脚步注入等问题。

以上是我总结的一些需求，不知道大家有没有类似的场景，针对这些需求，大家是如何满足的呢？

## 实现目标

针对以上问题，我们希望通过简单的配置即可满足需要，简化网络请求实现，提高接口对接效率，将开发者的注意力集中在UI层的交互和业务逻辑开发。

具体如下：

1. 简单可配置，提供全局的配置，以及单一接口的配置，单一接口的配置可以覆盖全局的配置
2. 请求拦截，利用 `Promise` 来做请求拦截，对外提供一个 `filter` 函数，暴露给用户自定义拦截需求
3. 请求合并，针对几乎是同时发出的请求，只需要一次请求即可，后续请求复用第一个的结果
4. 请求缓存，针对不同场景提供可选的存储项，比如内存、`localStorage`、`sessionStorage` 等
5. `Mock`，对外提供 `mock` 函数，可以全局配置，也可以针对单个接口配置
6. 安全检查，利用 `xss` 过滤库，做安全检查，加入 `csrf token` 防止伪造请求。

## 实现

### 简单可配置

示例：

全局配置：
```js
import { buildApi, http } from 'biz-lib';
let count = 0;
export default function (opts) {
    return buildApi(opts, {
        isDev:process.env.NODE_ENV === 'development',   
        /**
         * 统一设置请求域名
        */
        host:'http://exam.china.com',
        /**
         * 将请求定向到 mock 服务器
         */     
        mock(url,option) {
            return http.get(`${mock.host}/mockjsdata/${mock.projectId}${url}`);
        },
        /**
         * 请求执行前
         */
        before() {
            Loading.show('请稍后...');
            count++;
        },
        /**
         * 请求执行后
        */
        after() {
            count--;
            if (count <= 0) {
                Loading.hide();
                count = 0;
            }
        },
        /** 
         * 过滤器，对请求预处理，和后端阅读 code 值，
         * code = 1 直接返回数据，其他可以抛异常，或自定义处理
        */
        filters: [
            function (res) {
                if (res.code == 1) {
                    return res.data;
                } else if (res.code === -1) {
                    throw new CodeError(-1, res.msg);
                } else if (res.code === 100) {
                    throw new CodeError(100, '您尚未登录');
                }
                return res;
            },
        ],
        // 统一处理异常，
        onError(err) {
            Loading.hide();
            count = 0;
            if (typeof err.code === 'undefined' || err.code === -1 ) {
                message.warning(err.message);
            } else if (err.code === 100) {
                window.location.href='/login'
            }
            throw err;
        },
    });
}
```

单一接口配置示例：
```js
import { buildApi } from './api';
const apis = buildApi({
    /**
     * POST 请求示例
    */
    'submitAnswer': {
        url: '/cexam/api/answer/submit/{id}'
        method:'GET' | 'POST' | 'Jsonp',
        format:'form' | 'json' | 'form-data',
        cache: true | false,
        storage:'sessionStorage' | 'localStorage' | 'memoryStorage',
        merge: true | false,
        mock:function(url,data,option){},
        before:function(){},
        after:function(){},
        filters:[],
        headers:{},
    },
    /**
     * GET 请求示例
    */
    'getQuestionList': '/cexam/api/exam/group/list/{id}' : 
});


export const submitAnswer=(id:string,data:IParams)=>{
    // 调用post请求
    return apis.submitAnswer({id},{data})
}

export const getQuestionList=(id:string)=>{
    // get请求
    apis.getQuestionList({id})
}

```

接口逻辑层需要对调用方提供可读的 `API`，可以利用 `Typescript` 对接口进行定义，调用方调用体验会很好。


配置项说明：

- `method` 请求类型，包括：POST/GET
- `format` 请求数据格式，包括：`json`/`form`/`form-data`
- `cache` 缓存请求数据（不刷新浏览器的情况下）
- `storage` 可以将请求缓存到存储，包括 `sessionStorage`/`localStorage`/`memoryStorage`
- `merge` 相同接口请求是否合并
- `before` 请求发起之前执行
- `after` 请求发起之后执行
- `filters` 函数式一个函数数组，前一个函数的输出是后一个函数的输入
- `mock` 提供请求的 `mock` 方法，自定义 `mock`。
- `headers` 自定义请求头
- `url` 请求的 `url`，可以内嵌参数，比如 `list/{id}`
- 参数 通过大括号 {} 设置，通过方法的第一次参数指定，和 {} 中设定的同名即可


### 请求响应拦截

提供请求响应拦截功能，处理通用业务逻辑，比如：
- 请求之前和请求之后显示和隐藏全局 `Loading` 
- 请求返回后预处理返回数据，减少调用端代码
- 统一处理例外情况，比如异常，登录超时，账号余额不足等等。

统一异常处理的前提是后端返回的规范的数据结构，比如`{code:0,data:'',message:''}`，约定 `code` 值，`code` 等于多少是请求正常，多少是异常，以及其他例外情况。

- 网络通信异常
- 程序执行异常
- 非异常的例外情况，比如登录超时、考试已结束、余额不足等

可以针对不同的异常进行编码，方便接口调用方捕获异常后进行自定义处理，类似后端的自定义异常类型，但是后端可以根据类型进行捕获，前端是弱类型，只好靠编码来识别异常了。

示例如下：
```js
let apis=buildApi({
    'submitAnswer': {
        method: 'POST',
        url: '/cexam/api/answer/submit'
    }
}, {
    filters: [
        function (res) {
            if (res.code == 1) {
                // code = 1 直接返回数据
                return res.data;
            } else if (res.code == -1) {
                throw new CommonlError(-1, res.message);
            } else if (res.code == -2) {
                // 考试已结束处理               
                throw new ExamTerminalError(-2, '考试已结束');
            } else if (res.code == -3) {
                // 余额不足处理
                throw new CommonlError(-3, res.message);
            }  else if (res.code == 10) {
                // 登录超时处理
                return window.location.href = '/login';
            }
            return res;
        },
        function (res){
            return res;
        }
    ],
    //统一处理异常，
    onError(err) {
        if (err['code'] == -1) {
            message.warning(err.message);
        }
        throw err;
    }
});
```

调用
```js
try{
    let data = await apis.submitAnswer();
    await apis.operationA(data);
    await apis.operationB();
}catch(err){
    if(err.code==-2){
        //处理考试结束的例外情况
    }else if(err.code == -3){
        //处理余额不足
    }
}

```

经过请求预处理，正常情况下直接返回后端数据，不需要判断 `code` 值，统一异常处理以后，通过 `catch` 捕获异常，自定义处理逻辑。

整体的编程体验很类似 `Java` 或者 `C#`。


### 请求合并

前文提到了需要请求合并的场景，比如有两个独立的组件，但是使用了相同的一个接口，即希望组件相互独立没有依赖，又希望相同请求只请求一次。

每个使用 `buid-api` 的地方都需要配置` merge:true`，可以共享一次请求。

```js
const api1 = buildApis({
    'getProjectAuth':{
        method:'GET',
        merge:true,
        url:'/api/project/auth'
    }
});
const api2 = buildApis({
    'getProjectAuth':{
        method:'GET',
        merge:true,
        url:'/api/project/auth'
    }
});
//如果api1调用过，api2会复用api1的返回结果
```

请求合并的实现比较取巧，如果判断有相同的请求，只要第二个请求复用第一个请求返回的 `Promise` 即可，

### 请求缓存

针对需要多次访问的请求，数据不变的话，可以设置缓存。

可以设置缓存的存储，默认是 `memoryStorage`，用户可以自定义 `storage` 的实现。

```js
const api1 = buildApis({
    'getProjectAuth':{
        method:'GET',
        cache:true,
        storage:'sessionStorage' | 'localStorage' | 'memoryStorage',
        url:'/api/project/auth'
    }
});
const api1 = buildApis({
    'getProjectAuth':{
        method:'GET',
        cache:true,
        storage:{
            get(key){},
            set(key,value){}
        },
        url:'/api/project/auth'
    }
});
```

## MOCK 数据 

可以提供统一的 `mock`配置，或者单独配置，单独配置的 `mock` 优先执行。

具体 `mock` 采用什么技术，由调用方决定，比如可以使用 `json`，或者 `rap`，或者 `mockjs` 库等。

如果采用本地 node 代理，可以不用设置 `mock`；

```js
const apis = buildApi({
    'submitAnswer': {
        method: 'POST/GET',
        format:'json/form/form-data',
        url: '/cexam/api/answer/submit',
        mock(url,data,option){
            return {
                id:1,
                name:'test'
            };
        }
    },
    'getQuestionList': '/cexam/api/exam/group/list/{id}' : 
},{
    mock(url,data,option) {
        return http.get(`${RAP.host}/mockjsdata/${RAP.projectId}${url}`);
    },
});
```

### 安全检查 

统一提供安全检查过滤，针对参数以及返回数据进行 `xss` 过滤，`csrf token` 添加，可以参考 `axios` 的方式。

## 最后

本文总结了常见的网络接口对接开发过程中常见的问题，并且针对需求提供了一个简单可配置的方案，极大的简化网络接口对接开发，提供了包括：请求响应拦截，合并，缓存，统一异常处理，`Mock` 等功能，简化了接口的调用，提升开发效率。
