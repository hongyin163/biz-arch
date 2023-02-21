module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'jest': true,
    },
    'globals': {
        'document': true,
        'localStorage': true,
        'window': true,
        'require': true,
        'module': true,
        '__dirname': true,
        'http': true,
        'process': true,
        'exports':true,
        'ActiveXObject':true,
        'global':true,
    },
    'extends': 'eslint:recommended',
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console':[
            0
        ],
        'no-var': 'error',
        'prefer-arrow-callback': 'warn',
        'prefer-template': 'error'
    }
};