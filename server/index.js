global.__BACKEND__     = process.env.BACKEND || '';
global.__ENVIRONMENT__ = process.env.APP_ENV || 'development';
global.__HOSTNAME__    = process.env.HOST || 'localhost';

var Express   = require('express');
var http      = require('http');
var IO        = require('socket.io');

var api    = require('./api');
var config = require('../application/config');
var render = require('./render');

var app    = new Express();
var server = http.createServer(app); 
var io     = new IO(server);

app.get(/^([^.]+)$/, render);

app.use(Express.static(process.cwd() + '/build'));

io.on('connection', function (socket) {
    socket.on('GET', function (key, callback) {
        api.get(key).done(callback)
    });
    socket.on('KEYS', function (path, callback) {
        api.keys().done(callback)
    });
});

server.listen(9090, function () {
    console.log('Listening on localhost:9090');
});
