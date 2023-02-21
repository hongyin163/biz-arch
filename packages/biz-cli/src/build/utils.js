import { posix } from 'path';
import config from '../config';

import { loader as _loader } from 'mini-css-extract-plugin';
export function assetsPath (_path) {
    return posix.join(config.assetsSubDirectory, _path);
}

export function cssLoaders (options) {
    options = options || {};

    let cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        let loaders = [cssLoader];
        if (loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        if (options.extract) {
            return [{
                loader: _loader,
                options: {
                    // you can specify a publicPath here
                    // by default it use publicPath in webpackOptions.output
                    publicPath: options.publicPath
                }
            }].concat(loaders);
        }

        return ['style-loader'].concat(loaders);
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less', {
            javascriptEnabled: true,
            modifyVars: {
                // '@primary-color': '#1AB58F',
                // '@border-radius-base': 0,
                // '@border-radius-sm ': 0
            }
        })
    };
}

export function styleLoaders (options) {
    let output = [];
    let loaders = cssLoaders(options);
    for (let extension in loaders) {
        let loader = loaders[extension];
        output.push({
            test: new RegExp(`\\.${extension}$`),
            use: loader
        });
    }
    return output;
}
