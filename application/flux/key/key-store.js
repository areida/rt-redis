'use strict';

import Fluxxor   from 'fluxxor';
import Immutable from 'immutable';
import _         from 'lodash';

import constants from './key-constants';

module.exports = Fluxxor.createStore({
    initialize : function()
    {
        this.value = new Immutable.List();
        this.keys  = new Immutable.List();
        this.error = false;

        this.bindActions(
            constants.KEY_CLEAR_VALUE, 'onClearValue',
            constants.KEY_GET, 'onGet',
            constants.KEY_GET_FAILURE, 'onGetFailure',
            constants.KEY_GET_SUCCESS, 'onGetSuccess',
            constants.KEY_GET_ALL, 'onGetAll',
            constants.KEY_GET_ALL_FAILURE, 'onGetAllFailure',
            constants.KEY_GET_ALL_SUCCESS, 'onGetAllSuccess'
        );
    },

    onClearValue()
    {
        this.value = new Immutable.List();

        this.emit('change');
    },

    onGet()
    {},

    onGetFailure(error)
    {
        this.error = error;

        this.emit('change');
    },

    onGetSuccess(response)
    {
        if (_.isArray(response)) {
            this.value = new Immutable.List(response);
        } else if (_.isObject(response)) {
            this.value = new Immutable.Map(response);
        } else if (response) {
            this.value = new Immutable.List([response]);
        } else {
            this.value = new Immutable.List();
        }

        this.emit('change');
    },

    onGetAll()
    {},

    onGetAllFailure(error)
    {
        this.error = error;

        this.emit('change');
    },

    onGetAllSuccess(response)
    {
        this.keys = new Immutable.List(response);

        this.emit('change');
    }
});