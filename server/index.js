global.__BACKEND__     = process.env.BACKEND || '';
global.__ENVIRONMENT__ = process.env.APP_ENV || 'development';
global.__HOSTNAME__    = process.env.HOST || 'localhost';

var Express = require('express');
var http    = require('http');
var IO      = require('socket.io');
var path    = require('path');
var request = require('request');

var api = require('./api');

var app    = new Express();
var server = http.createServer(app); 
var io     = new IO(server);

app.use(function (req, res, next) {
    var ext = path.extname(req.url);

    if ((ext === '' || ext === '.html') && req.url !== '/') {
        req.pipe(request('http://' + req.hostname + ':9000')).pipe(res);
    } else {
        next();
    }
});

io.on('connection', function (socket) {
    socket.on('key', function (key, callback) {
        api.key(key).done(callback)
    });
    socket.on('keys', function (path, callback) {
        api.keys().done(callback)
    });
});

server.listen(9090, function () {
    console.log('Listening on localhost:9090');
});
