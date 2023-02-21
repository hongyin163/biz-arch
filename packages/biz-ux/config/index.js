const env = process.env.NODE_ENV || 'production';

const CONFIG = {
    'development': {
        sourceMap: true,
        assetsRoot: '',
        publicPath:'/',
        env: {
            NODE_ENV: '"development"',
        }

    },
    'production': {
        sourceMap: false,
        assetsRoot: '',
        publicPath:'/',
        env: {
            NODE_ENV: '"production"',
        }
    },
    'test': {
        sourceMap: false,
        assetsRoot: '',
        publicPath:'/',
        env: {
            NODE_ENV: '"test"',
        }
    }
};

module.exports = CONFIG[env];