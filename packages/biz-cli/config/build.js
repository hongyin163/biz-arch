let pkg = require('../package.json');
let path = require('path');

module.exports = {
    production: {
        env:{
            NODE_ENV: '"production"'
        },
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: `//j1.58cdn.com.cn/git/hrg-fe/chinahr-fe/${pkg.name}/`,
        cssPublicPath: `//c.58cdn.com.cn/git/hrg-fe/chinahr-fe/${pkg.name}/`,
        imagePublicPath: `//img.58cdn.com.cn/git/hrg-fe/chinahr-fe/${pkg.name}/`,
        mediaPublicPath: `//c.58cdn.com.cn/git/hrg-fe/chinahr-fe/${pkg.name}/`,
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: false// process.env.npm_config_report
    },
    development: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8120,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '//localhost:8120/',
        cssPublicPath: '//localhost:8120/',
        imagePublicPath: '//localhost:8120/',
        mediaPublicPath: '//localhost:8120/',
        viewsPath: './src/views',
        controllersPath: './server/controllers',
        proxyTable: {},
        cssSourceMap: false,
        bundleAnalyzerReport: true
    },
    test: {
        env:{
            NODE_ENV: '"test"'
        },
        port: 8120,
        assetsRoot: path.resolve(__dirname, '../dist'),
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '//localhost.chinahr.com:8120/',
        cssPublicPath: '//localhost.chinahr.com:8120/',
        imagePublicPath: '//localhost.chinahr.com:8120/',
        mediaPublicPath: '//localhost.chinahr.com:8120/',
        viewsPath: './src/views',
        controllersPath: './server/controllers',
        proxyTable: {},
        cssSourceMap: false,
        bundleAnalyzerReport: false
    }
};
