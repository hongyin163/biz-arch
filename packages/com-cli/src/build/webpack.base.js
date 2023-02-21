
let paths = require('../paths');

const publicPath='./';

const babelOptions = {
    presets: [
    ],
    plugins: [
      
    ]
};

module.exports = {
    output: {
        path: paths.dist(),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': paths.base('src'),
            'biz-ux': paths.base('index.js'),
        }
    },
    module: {
        unknownContextCritical: false,
        rules: [
            {
                test: /\.js(x?)$|\.ts(x?)$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: babelOptions
                }]
            },
            // {
            //     test: /\.ts(x?)$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: babelOptions
            //         },
            //         {
            //             loader: 'ts-loader',
            //             options: {
            //                 transpileOnly: true
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'img/[name].[hash:7].[ext]',
                    publicPath,
                }
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'media/[name].[hash:7].[ext]',
                    publicPath,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'fonts/[name].[hash:7].[ext]',
                    publicPath,
                }
            }
        ]
    },
    node: {
        // Mock Node.js modules that Babel require()s but that we don't
        // particularly care about.
        fs: 'empty',
        module: 'empty',
        net: 'empty'
    },
    cache: true,
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-redux': 'ReactRedux',
        'redux': 'Redux',
        'immutable': 'Immutable',
        'lodash': '_',
        'jquery': 'jQuery',
        'draft-js': 'Draft',
        'http': 'http'
    },
    plugins: [
        // new HappyPack({
        //     // threads: 2,
        //     // id: 'js',
        //     // 3) re-add the loaders you replaced above in #1:
        //     loaders: [
        //         {
        //             loader: 'babel-loader',
        //             include: [paths.src()],
        //             options: babelOptions
        //         }
        //     ]
        // })
    ]
};
