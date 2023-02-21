'use strict';

require('@babel/register')({
    presets: ['@babel/preset-env'],
    plugins: [
    ]
});

let express = require('express');
let config = require('./config/config.js');

let app = express();

let server = require('http').Server(app);

require('./config/middleWare')(app, config);

server.listen(config.port, () => {
    console.log(`系统启动成功 port ${  config.port}`);
});
