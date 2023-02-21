'use strict';
import express from 'express';
import glob from 'glob';
import path from 'path';
// var favicon = require('serve-favicon');
// import logger from 'morgan';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import compress from 'compression';
// import methodOverride from 'method-override';

module.exports = function (app, config) {
    let env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    app.set('views', `${config.root}/views`);
    app.set('view engine', 'ejs');

    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    // app.use(logger('dev'));
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));
    // app.use(cookieParser());
    app.use(compress());
    app.use(express.static(path.resolve(config.root, '../styleguide')));
    app.use(express.static(path.resolve(config.root, '../static')));
    // app.use(methodOverride());
   
    let controllers = glob.sync(`${config.root  }/controllers/*.js`);
    controllers.forEach((controller) => {
        require(controller)(app);
    });
    app.use((_req, res) => {
        let err = new Error('Not Found');
        err.status = 404;
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });

    if (app.get('env') === 'development') {
        app.use((err, _req, res) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    app.use((err, _req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });
};
