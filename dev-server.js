/* globals console, global, process */
'use strict';

global.__BACKEND__     = process.env.BACKEND;
global.__ENVIRONMENT__ = process.env.APP_ENV || 'development';
global.__HOSTNAME__    = process.env.HOST || 'localhost';

var WebpackDevServer = require('webpack-dev-server');
var webpack          = require('webpack');
var config           = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
    proxy   : {'*' : {'target' : 'http://localhost:9090'}},
    hot     : true,
    noInfo  : true
});

server.listen(9000, function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:9000');
});
