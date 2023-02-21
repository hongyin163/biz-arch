const { resolve } = require('./paths');

module.exports = function (modules) {
    const plugins = [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-transform-object-assign'
        // resolve('babel-plugin-inline-import-data-uri'),
        // resolve('@babel/plugin-transform-member-expression-literals'),
        // resolve('@babel/plugin-transform-object-assign'),
        // resolve('@babel/plugin-transform-property-literals'),
        // [
        //     resolve('@babel/plugin-transform-runtime'),
        //     {
        //         helpers: false,
        //     },
        // ],
        // resolve('@babel/plugin-transform-spread'),
        // resolve('@babel/plugin-transform-template-literals'),
        // resolve('@babel/plugin-proposal-export-default-from'),
        // resolve('@babel/plugin-proposal-export-namespace-from'),
        // resolve('@babel/plugin-proposal-object-rest-spread'),
        // [
        //     resolve('@babel/plugin-proposal-decorators'),
        //     {
        //         legacy: true,
        //     },
        // ],
        // resolve('@babel/plugin-proposal-class-properties'),
    ];
    return {
        presets: [
            resolve('@babel/preset-typescript'),
            [
                resolve('@babel/preset-env'),
                {
                    modules,
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'Firefox ESR',
                            '> 1%',
                            'ie >= 9',
                            'iOS >= 8',
                            'Android >= 4',
                        ],
                    },
                    useBuiltIns: false,
                }
            ],
            resolve('@babel/preset-react'),
        ],
        plugins,
        ignore:[
            '**/types.d.ts'
        ]
    };
};
