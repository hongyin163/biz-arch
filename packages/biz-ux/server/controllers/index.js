/* eslint-disable no-unused-vars */
'use strict';

let express = require('express');
let router = express.Router();

module.exports = function (app) {
    app.use('/', router);
};


// router.get(['/', '/index'], (req, res, next) => {
//     res.render('index');
// });

// router.get('/upload/file', (req, res, next) => {
//     res.send({
//         code:1,
//         msg:'上传成功'
//     })
// });
