let paths = require('./paths');
let fs = require('fs');
let glob = require('glob');
let webpack = require('webpack');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.base');
let minimist = require('minimist');
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
let chalk = require('chalk');
// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach((name) => {
//     baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
// });


const args = minimist((process.argv.slice(2)));
const name = args.name;
if (name === true) {
    console.log(chalk.default.yellow('Please enter the name of the component, e.g. npm run dev button'));
    process.exit(1);
}

const entry = paths.src(`${name}/demo/index.tsx`);
if (!fs.existsSync(entry)) {
    console.log(chalk.default.yellow(`Please check if file '${entry}' exists`));
    process.exit(1);
}

let webpackConfig = merge(baseWebpackConfig, {
    entry: {
        'demo': paths.src(`${name}/demo`),
    },
    mode: 'development',
    output: {
        path: paths.base('./static'),
        filename: 'demo.js',
    },
    devServer: {
        contentBase: paths.base('./static')
    },
    module: {
        rules: [{
            test: /(\.less|\.css)$/,
            use: [
                'style-loader',
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

    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
});

module.exports = webpackConfig;
