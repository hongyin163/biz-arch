const path = require('path');
const dirname = process.cwd();

function resolve(...args) {
    // console.log(args);
    return path.resolve(dirname, ...args);
}

export default {
    src(dir = '') {
        return resolve('components', dir);
    },
    lib(dir = '') {
        return resolve('lib', dir);
    },
    dist(dir = '') {
        return resolve('dist', dir);
    },
    es(dir = '') {
        return resolve('es', dir);
    },
    tmp(dir = '') {
        return resolve('tmp', dir);
    },
    base(dir = '') {
        return resolve(dir);
    },
    resolve(moduleName) {
        return require.resolve(moduleName);
    },
    tsConfig() {
        return resolve('tsconfig.json');
    },
    entry() {
        return resolve('index.js');
    }
};
