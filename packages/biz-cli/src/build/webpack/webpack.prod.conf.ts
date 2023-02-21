// tslint-disable
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import { DefinePlugin, HashedModuleIdsPlugin } from 'webpack';
import webpackBundleAnalyzer from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import config from '../../config';
import entries from '../../entry';
// import { resolve } from 'path';
import paths from '../../paths';
import { assetsPath, styleLoaders } from '../utils';
import { getTemplatePlugin } from './plugin-html-template';
import { getSplicChunkConfig } from './plugin-split-chunk';
import baseWebpackConfig from './webpack.base.conf';


const customConfig = require(`${paths.config}/webpack.production.js`);

const splitChunks = getSplicChunkConfig(entries);
const plugins = getTemplatePlugin(entries);

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: styleLoaders({
            sourceMap: config.productionSourceMap,
            publicPath: config.cssPublicPath,
            extract: true,
        }),
    },
    devtool: config.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.assetsRoot,
        filename: assetsPath('js/[name].js?v=${staticVersion}'),
        chunkFilename: assetsPath('js/[name].[chunkhash:8].chunk.js'),
        // publicPath: config.assetsPublicPath
    },
    optimization: {
        splitChunks,
    },
    plugins: [
        new DefinePlugin({
            'process.env': config.env,
        }),
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].css?v=${staticVersion}'),
            chunkFilename: assetsPath('css/[name].[chunkhash:8].css'),
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
            },
        }),
        ...plugins,
        // keep module.id stable when vender modules does not change
        new HashedModuleIdsPlugin(),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: paths.resolve('./static'),
                to: config.assetsSubDirectory,
                ignore: ['.*'],
            },
        ]),
    ],
});


if (config.productionGzip) {
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                `\\.(${config.productionGzipExtensions.join('|')})$`,
            ),
            threshold: 10240,
            minRatio: 0.8,
        }),
    );
}

if (config.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = webpackBundleAnalyzer.BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 9999,
    }));
}

export default merge(webpackConfig, customConfig);
