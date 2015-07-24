'use strict';

var Fluxxor = require('fluxxor');
var Q       = require('q');
var _       = require('lodash');

var Stores  = require('./stores');
var actions = require('./actions');

var Flux = function () {
    var stores = {};

    _.each(Stores, function (Store, name) {
        stores[name] = new Store();
    });

    Fluxxor.Flux.call(this, stores, actions);
};

Flux.prototype = Object.create(Fluxxor.Flux.prototype);

Flux.prototype.fetchData = function (state) {
    var flux = this;

    return Q.all(
        state.routes
            .filter(function (route)  {
                return route.handler.fetchData;
            })
            .reduce(
                function (promises, route) {
                    var promise = route.handler.fetchData(flux, state);

                    if (_.isArray(promise)) {
                        promises = promises.concat(promise);
                    } else {
                        promises.push(promise);
                    }

                    return promises;
                },
                []
            )
    );
};

Flux.prototype.fromObject = function (object) {
    _.each(object, function (state, name) {
        this.stores[name].fromObject(state);
    }, this);

    return this;
};

Flux.prototype.getTitle = function (state, defaultTitle) {
    var flux, titles;

    flux   = this;
    titles = state.routes
        .filter(function (route)  {
            return route.handler.getTitle || route.handler.title;
        })
        .reduce(
            function (titles, route) {
                if (route.handler.getTitle) {
                    titles.push(route.handler.getTitle(flux, state));
                } else {
                    titles.push(route.handler.title);
                }

                return titles;
            },
            [defaultTitle]
        );

    return _.last(_.compact(titles));
};

Flux.prototype.toObject = function () {
    var data = {};

    _.each(this.stores, function (store, name) {
        data[name] = store.toObject();
    });

    return data;
};

module.exports = Flux;
