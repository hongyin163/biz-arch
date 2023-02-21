//tslint:disable 
import paths from './paths';

const config = require(paths.build);
const ENV = process.env.NODE_ENV||'development';
const port = config[ENV].port || process.env.PORT || 8120;
const localPublicPath = `//localhost:${port}/`;
const controllersPath = paths.resolve('./server/controllers');

const def = {
    'development': {
        env:{
            NODE_ENV: '"development"'
        },
        port,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: localPublicPath,
        cssPublicPath: localPublicPath,
        imagePublicPath: localPublicPath,
        mediaPublicPath: localPublicPath,
        viewsPath: paths,
        controllersPath,
        proxyTable: {},
        cssSourceMap: false,
        bundleAnalyzerReport: true,
    },
    'production': {
        env:{
            NODE_ENV: '"production"'
        },
        port,
        assetsRoot: paths.resolve('./dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        cssPublicPath: '/',
        imagePublicPath: '/',
        mediaPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: false,// process.env.npm_config_report
    },
    'test': {
        env:{
            NODE_ENV: '"test"'
        },
        port,
        assetsRoot: paths.resolve('./dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        cssPublicPath: '/',
        imagePublicPath: '/',
        mediaPublicPath: '/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: false,// process.env.npm_config_report
    },
}

export default Object.assign({}, def[ENV], config[ENV]);
