global.__BACKEND__     = process.env.BACKEND || '';
global.__ENVIRONMENT__ = process.env.APP_ENV || 'development';
global.__HOSTNAME__    = process.env.HOST || 'localhost';

var Express   = require('express');

var api    = require('./api');
var config = require('../application/config');
var render = require('./render');

var app = new Express();

app.use('/api', api);
app.get(/^([^.]+)$/, render);

app.use(Express.static(process.cwd() + '/build'));

app.listen(9090, 10, function () {
    console.log('Listening on localhost:9090');
});
