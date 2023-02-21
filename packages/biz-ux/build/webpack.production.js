let paths = require('./paths');
let webpack = require('webpack');
let config = require('../config');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.base');

let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
console.log(config.publicPath);
let webpackConfig = merge(baseWebpackConfig, {
    entry: {
        'biz-ux': paths.entry(),
    },
    mode: 'development',
    output: {
        path: paths.dist(),
        filename: '[name].min.js',
        chunkFilename: '[name].chunk.min.js',
        publicPath: config.publicPath,
        library: 'BizUI',
        libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /(\.less|\.css)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        //publicPath: options.publicPath
                    }
                },
                'css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        modifyVars: {
                            // '@primary-color': '#1AB58F',
                            // '@border-radius-base': 0,
                            // '@border-radius-sm ': 0
                        }
                    }
                }
            ]
        }]
    },
    devtool: config.sourceMap ? '#source-map' : false,
    optimization: {
        splitChunks: false,
        // splitChunks: {
        //     cacheGroups:{
        //         default: {
        //             minChunks: 1,
        //             priority: -20,
        //             reuseExistingChunk: true,
        //         },
        //         //打包重复出现的代码
        //         vendor: {
        //             test: /[\\/]node_modules[\\/]/,
        //             maxInitialRequests: 3,
        //             maxAsyncRequests: 3,
        //             minSize: 30000,
        //             maxSize: 500000,
        //             chunks: 'all',
        //             name: 'vendor'
        //         },
        //     }
        // }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
            publicPath: config.publicPath,
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
    ]
});

module.exports = webpackConfig;
