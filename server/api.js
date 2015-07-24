var Express = require('express');
var redis   = require('then-redis');
var Q       = require('q');

var config = require('../application/config');

var app = new Express();

var db = redis.createClient();

app.get('/keys', function (req, res) {
    db.keys('*').then(function (keys) {
        keys = keys || [];

        db.multi();
        keys.map(
            function (key) {
                db.type(key);
            }
        )

        db.exec().then(
            function(types) {
                res.json(types.map(
                    function (type, index) {
                        return {
                            key  : keys[index],
                            type : type
                        };
                    }
                ));
            }
        );
    });
});

app.get('/ttl/:key', function (req, res) {
    db.ttl(req.params.key).then(
        function (reply) {
            res.json(reply);
        }
    );
});

app.get('/hash/:key', function (req, res) {
    db.hgetall(req.params.key).then(
        function (reply) {
            res.json(reply || {});
        }
    );
});

app.get('/list/:key', function (req, res) {
    db.lrange(req.params.key, 0, -1).then(
        function (reply) {
            res.json(reply || []);
        }
    );
});

app.get('/set/:key', function (req, res) {
    db.smembers(req.params.key).then(
        function (reply) {
            res.json(reply || []);
        }
    );
});

app.get('/string/:key', function (req, res) {
    db.get(req.params.key).then(
        function (reply) {
            res.json(reply);
        }
    );
});

app.get('/zset/:key', function (req, res) {
    db.zrange(req.params.key, 0, -1, 'WITHSCORES').then(
        function (reply) {
            reply    = reply || [];
            response = [];

            while (reply.length) {
                response.push({
                    member : reply.shift(),
                    score  : reply.shift()
                });
            }

            res.json(response);
        }
    );
});

module.exports = app;
