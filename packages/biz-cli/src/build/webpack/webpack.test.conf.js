import { basename, resolve } from 'path';
import { styleLoaders } from '../utils';
import { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack';
import config from '../../config';
import entries from '../../entry';
import paths from '../../paths';
import merge from 'webpack-merge';
import baseWebpackConfig from './webpack.base.conf';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
const devClient = paths.lib('build/dev-client');
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach((name) => {
    baseWebpackConfig.entry[name] = [devClient].concat(baseWebpackConfig.entry[name]);
});
const customConfig = require(`${paths.config}/webpack.test.js`);

function getTemplatePlugin() {
    let plugins = [],ignores=[];
    Object.keys(entries).forEach((key) => {
        let item = entries[key];
        plugins.push(new HtmlWebpackPlugin({
            filename: item.template,
            template: item.template,
            inject: true,
            chunks: [key],
            chunksSortMode: 'none'
        }));
        ignores.push(basename(item.template));
    });
    console.log(ignores);
    plugins.push(new CopyWebpackPlugin([
        {
            from: resolve(__dirname, `${paths.src}/views/`),
            to: resolve(__dirname, `${paths.src}/views/`),
            ignore: ignores
        }
    ]));

    return plugins;
}

let webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: styleLoaders({ sourceMap: config.cssSourceMap })
    },
    mode: 'development',
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new DefinePlugin({
            'process.env': config.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        ...getTemplatePlugin(),
        // copy custom static assets
        new FriendlyErrorsPlugin()
    ]
});

if (config.bundleAnalyzerReport) {
    let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 9999
    }));
}

// webpackConfig.plugins = webpackConfig.plugins.concat(getTemplatePlugin());

export default merge(webpackConfig, customConfig);

