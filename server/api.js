var Express = require('express');
var redis   = require('then-redis');
var Q       = require('q');

var config = require('../application/config');

var app = new Express();

var db = redis.createClient();

var getters = {
    hash : function (key) {
        return db.hgetall(key).then(
            function (reply) {
                return (reply || {})
            }
        );
    },
    list : function (key) {
        return db.lrange(key, 0, -1).then(
            function (reply) {
                return (reply || [])
            }
        );
    },
    set : function (key) {
        return db.smembers(key).then(
            function (reply) {
                return (reply || [])
            }
        );
    },
    string : function (key) {
        return db.get(key).then(
            function (reply) {
                return ([reply] || []);
            }
        );
    },
    ttl : function (key) {
        return db.ttl(key).then(
            function (ttl) {
                return (ttl);
            }
        );
    },
    zset : function (key) {
        return db.zrange(key, 0, -1, 'WITHSCORES').then(
            function (reply) {
                reply    = reply || [];
                response = [];

                while (reply.length) {
                    response.push({
                        member : reply.shift(),
                        score  : reply.shift()
                    });
                }

                return response;
            }
        );
    }
};

app.get('/keys', function (req, res) {
    db.keys('*').then(function (keys) {
        res.json(keys || []);
    });
});

app.get('/key/:key', function (req, res) {
    db.type(req.params.key).then(
        function (type) {
            if (getters.hasOwnProperty(type)) {
                Q.all([
                    getters[type](req.params.key),
                    getters.ttl(req.params.key)
                ]).done(
                    function (responses) {
                        res.json({
                            key   : req.params.key,
                            ttl   : responses[1],
                            type  : type,
                            value : responses[0]
                        });
                    }
                );
            } else {
                res.sendStatus(404);
            }
        }
    );
});

module.exports = app;
