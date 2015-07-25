'use strict';

import Fluxxor   from 'fluxxor';
import Immutable from 'immutable';

import constants from './key-constants';

export default Fluxxor.createStore({
    initialize()
    {
        this.data  = new Immutable.Map();
        this.keys  = new Immutable.List();
        this.error = false;

        this.bindActions(
            constants.CLEAR_VALUE, 'onClearValue',
            constants.GET_KEY, 'onGetKey',
            constants.GET_KEY_FAILURE, 'onGetKeyFailure',
            constants.GET_KEY_SUCCESS, 'onGetKeySuccess',
            constants.GET_KEYS, 'onGetKeys',
            constants.GET_KEYS_FAILURE, 'onGetKeysFailure',
            constants.GET_KEYS_SUCCESS, 'onGetKeysSuccess'
        );
    },

    onClearValue()
    {
        this.data = new Immutable.Map();

        this.emit('change');
    },

    onGetKey()
    {},

    onGetKeyFailure(error)
    {
        this.error = error;

        this.emit('change');
    },

    onGetKeySuccess(response)
    {
        this.data = Immutable.fromJS(response || {});

        this.emit('change');
    },

    onGetKeys()
    {},

    onGetKeysFailure(error)
    {
        this.error = error;

        this.emit('change');
    },

    onGetKeysSuccess(response)
    {
        this.keys = new Immutable.List(response);

        this.emit('change');
    }
});