let path = require('path');

function resolve(p) {
    return path.resolve(__dirname, '..', p);
}

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src'),
            'ats-lib': resolve('packages/ats-lib'),
            'ats-ui': resolve('packages/ats-ui'),
            'biz-ui': resolve('packages/biz-ui'),
            'biz-lib': resolve('packages/biz-lib'),
            'biz-store': resolve('packages/biz-store'),
        }
    },
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
}
