
import opn from 'opn';
import { posix, resolve as __resolve } from 'path';
import { sync } from 'glob';
import express, { static } from 'express';
import webpack from 'webpack';
import proxyMiddleware from 'http-proxy-middleware';
import minimist from 'minimist';
import viewRouter from './view-router';
import webpackConfig from '../webpack/webpack.dev.conf';
// import webpackProdConfig from '../webpack/webpack.prod.conf';
// import buildEntry from '../webpack/build-entry';
import velocityEngine from './velocity-engine';
import config from '../../config';
import entry from '../../entry';

// 获取要构建参数
const options = minimist(process.argv.slice(2), {
    default: {
        name: ''
    }
});
// console.log(process.argv)
// 需要构建的项目名，空表示全部构建
const name = options.name;

if (typeof name === 'string' && name !== '') {
    let entry = {
        [name]: webpackConfig.entry[name]
    }
    webpackConfig.entry = entry;
}

console.log(`project：
${JSON.stringify(webpackConfig.entry,null,4)}`)

// default port where dev server listens for incoming traffic
const env = process.env.NODE_ENV || config.env.NODE_ENV;
const port = config.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.proxyTable || {};

const app = express();

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

// webpack 
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: console.log,
    heartbeat: 2000
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' });
        cb && cb();
    });
});

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options };
    }
    app.use(proxyMiddleware(options.filter || context, options));
});

//全用vm模板引擎
app.set('views', config.viewsPath);
app.set('view engine', 'html');
app.engine('html', velocityEngine({
    viewsDir: config.viewsPath,
    fs: devMiddleware.fileSystem
}));//end engine

// serve pure static assets
const staticPath = posix.join(config.assetsPublicPath, config.assetsSubDirectory);
app.use(staticPath, static('./static'));

//前端路由入口
app.use('/', viewRouter(entry));

//处理自定义的接口
const controllers = sync(__resolve(config.controllersPath, './*.js'));
controllers.forEach((controller) => {
    require(controller)(app);
});

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

const uri = `http:${config.assetsPublicPath}` || `http://localhost:${port}`;

let _resolve;
const readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

console.log(`> Starting dev server for ${name === '' ? 'all' : name}...`);
devMiddleware.waitUntilValid(() => {
    console.log(`> Listening at ${uri}\n`);
    if (autoOpenBrowser) {
        opn(uri);
    }
    _resolve();
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        message: err.message,
        // error: err,
        title: 'error'
    });
});

let server = app.listen(port);

export const ready = readyPromise;
export function close() {
    server.close();
}
