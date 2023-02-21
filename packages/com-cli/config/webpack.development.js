const merge = require('merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    // NODE_ENV: '"development"'
});
