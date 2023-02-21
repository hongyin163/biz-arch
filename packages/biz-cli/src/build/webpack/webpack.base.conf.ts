import HappyPack from 'happypack';
import { IgnorePlugin } from 'webpack';
import config from '../../config';
import { assetsPath } from '../utils';
import buildEntry from './build-entry';
import babelOptions from './babel.config';

const { assetsPublicPath, imagePublicPath, mediaPublicPath, assetsRoot } = config;
const entry = buildEntry();
const publicPath = assetsPublicPath;
const imagePath = imagePublicPath;
const mediaPath = mediaPublicPath;

export default {
    entry,
    output: {
        path: assetsRoot,
        filename: '[name].js',
        publicPath,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        unknownContextCritical: false,
        rules: [
            {
                test: /\.js(x?)$|\.ts(x?)$/,
                exclude: /(node_modules|bower_components)/,
                // use: 'happypack/loader?id=tsbuild',
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions,
                    },
                ],
            },
            // {
            //     test: /\.ts(x?)$/,
            //     exclude: /(node_modules|bower_components)/,
            //     include: [paths.resolve('src'), paths.resolve('packages')],
            //     use: 'happypack/loader?id=tsbuild',
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: assetsPath('img/[name].[hash:7].[ext]'),
                    publicPath: imagePath,
                },
            },
            {
                test: /\.(pdf|doc|docx)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: assetsPath('file/[name].[hash:7].[ext]'),
                    publicPath: imagePath,
                },
            },
            {
                test: /\.txt$/,
                use: 'raw-loader',
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src'],
                    },
                }],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: assetsPath('media/[name].[hash:7].[ext]'),
                    publicPath: imagePath,
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: assetsPath('fonts/[name].[hash:7].[ext]'),
                    publicPath: mediaPath,
                },
            },
        ],
    },
    node: {
        // Mock Node.js modules that Babel require()s but that we don't
        // particularly care about.
        fs: 'empty',
        module: 'empty',
        net: 'empty',
    },
    cache: true,
    plugins: [
        new HappyPack({
            // threads: 4,
            id: 'tsbuild',
            // cache: true,
            // 3) re-add the loaders you replaced above in #1:
            loaders: [
                {
                    loader: 'babel-loader',
                    options: babelOptions,
                }
            ],
        }),
        new IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
};
