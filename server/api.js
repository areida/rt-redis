var redis = require('then-redis');
var Q     = require('q');

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

module.exports = {
    key : function(key) {
        return db.type(key).then(
            function (type) {
                if (getters.hasOwnProperty(type)) {
                    return Q.all([
                        getters[type](key),
                        getters.ttl(key)
                    ]).then(
                        function (responses) {
                            return {
                                key   : key,
                                ttl   : responses[1],
                                type  : type,
                                value : responses[0]
                            };
                        }
                    );
                } else {
                    return {
                        key   : key,
                        ttl   : -1,
                        type  : type,
                        value : null
                    };
                }
            }
        );
    },
    keys : function() {
        return db.keys('*').then(
            function (keys) {
                return (keys || []);
            }
        );
    }
};
