let pkg = require('../package.json');
let path = require('path');

module.exports = {
    production: {
        env:{
            NODE_ENV: '"production"'
        },
    },
    development: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8120,
        autoOpenBrowser: true,
    },
    test: {
        env:{
            NODE_ENV: '"test"'
        },
        port: 8120,
    }
};
