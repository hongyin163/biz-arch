'use strict';

let path = require('path'),
    rootPath = path.normalize(`${__dirname  }/..`);

let env = process.env.NODE_ENV || 'development';

process.env.NODE_ENV = env;

let config = {
    development: {
        root: rootPath,
        cdn: `http://localhost:${  process.env.PORT || 8001  }/`,
        app: {
            name: 'chr-cmp'
        },
        port: process.env.PORT || 8001,
        db: {
            connection: 'mongodb://rw_cmpuser:a7ecf07edbf731fa3e@test19657.mdb.58dns.org:28024,test19694.mdb.58dns.org:28024,test1214.mdb.58dns.org:28024/mdbchr_cmp?replicaSet=28024&journal=true&authSource=admin'
        },
        cache: {
            host: ' 127.0.0.1',
            port: 6078,
            password: '40182a9313812709',
            return_buffers: true
        },
        token: {
            name: 'CMPUSER',
            enable: false,
            secret: 'password@1',
            expires: 30 * 12 * 60 * 60 * 1000
        },
        sso: {
            endpoint: 'https://sso.test.58.com:8443/gsso',
            server: ['192.168.177.150']
        },
        bsp: {
            appsecret: 'b6b88e3f5bb7228725bfd00c1e828899',
            loginurl: 'http://te.union.vip.58.com/',
            appkey: 'chrcmp',
            host: 'http://cpcgi.web.58dns.org',
        }
    },
    test: {
        root: rootPath,
        cdn: `http://192.168.187.55:${  process.env.PORT || 8001  }/`,
        app: {
            name: 'chr-cmp'
        },
        port: process.env.PORT || 8001,
        db: {
            connection: 'mongodb://rw_cmpuser:a7ecf07edbf731fa3e@test19657.mdb.58dns.org:28024,test19694.mdb.58dns.org:28024,test1214.mdb.58dns.org:28024/mdbchr_cmp?replicaSet=28024&journal=true&authSource=admin'
        },
        cache: {
            host: 'test19656.rdb.58dns.org',
            port: 6088,
            password: '0230cdd07911d479',
            return_buffers: true
        },
        token: {
            name: 'CMPUSER',
            enable: true,
            secret: 'password@1',
            expires: 30 * 12 * 60 * 60 * 1000
        },
        sso: {
            endpoint: 'https://sso.test.58.com:8443/gsso',
            server: ['192.168.177.150'],
        },
        bsp: {
            appsecret: '5e815a17931c81fe14f2b1381d399493',
            loginurl: 'http://te.union.vip.58.com/',
            appkey: 'chrcmp',
            host: 'http://192.168.177.151:8896',
        }
    },

    production: {
        root: rootPath,
        app: {
            name: 'chr-cmp'
        },
        cdn: `http://10.9.197.25:${process.env.PORT || 8001 }/`,
        port: process.env.PORT || 8001,
        db: {
            connection: 'mongodb://cmp_wr:00b0a02f74ce4b59@m7140n1.mdb.chrdns.org:7140,m7140n2.mdb.chrdns.org:7140,m7140n3.mdb.chrdns.org:7140/mdbchr_cmp?replicaSet=7140&authSource=admin&journal=true'
        },
        cache: {
            host: 'cmpnode.rdb.58dns.org',
            port: 6078,
            password: '40182a9313812709',
            return_buffers: true
        },
        token: {
            name: 'CMPUSER',
            enable: false,
            secret: 'password@1',
            expires: 30 * 12 * 60 * 60 * 1000
        },
        sso: {
            endpoint: 'https://passport.58corp.com',
            server: ['192.168.177.150'],
        },
        bsp: {
            appsecret: 'b6b88e3f5bb7228725bfd00c1e828899',
            loginurl: 'http://union.vip.58.com/',
            appkey: 'chrcmp',
            host: 'http://union.web.58dns.org',
        }
    }
};

module.exports = config[env];
