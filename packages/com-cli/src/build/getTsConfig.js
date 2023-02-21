
const paths = require('../paths');
// const fs = require('fs');
const tsConfig = require(paths.tsConfig());

module.exports = function getTsConfig() {
    return Object.assign(
        tsConfig.compilerOptions,
        {
            "rootDir":'../components'
        }
    );    
};
