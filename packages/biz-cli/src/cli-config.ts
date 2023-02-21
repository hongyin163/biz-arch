
export default {
    dev: {
        entry: './build/server/dev-server.js',
        env: {
            NODE_ENV: 'development',
        }
    },
    build:{
        entry: './build/build.js',
        env: {
            NODE_ENV: 'production',
        }
    },
    test:{
        entry: './build/server/test-server.js',
        env: {
            NODE_ENV: 'test',
        }
    },
    init:{
        entry: './command/init/index.js',
        env: {}
    },
    add:{
        entry: './command/add/index.ts',
        env: {}
    },
}
