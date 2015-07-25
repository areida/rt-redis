'use strict';

import Fluxxor   from 'fluxxor';
import Immutable from 'immutable';

import constants from './key-constants';

export default Fluxxor.createStore({
    initialize : function()
    {
        this.data  = new Immutable.Map();
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
        this.data = new Immutable.Map();

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
        this.data = Immutable.fromJS(response || {});

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