'use strict';

import constants from './key-constants';
import client    from './key-client';

module.exports = {
    clearValue()
    {
        this.dispatch(constants.KEY_CLEAR_VALUE);
    },
    get(key)
    {
        this.dispatch(constants.KEY_GET);

        return client.get(key).then(
            response => this.dispatch(constants.KEY_GET_SUCCESS, response),
            error => this.dispatch(constants.KEY_GET_FAILURE, error)
        );
    },
    getAll()
    {
        this.dispatch(constants.KEY_GET_ALL);

        return client.getAll().then(
            response => this.dispatch(constants.KEY_GET_ALL_SUCCESS, response),
            error => this.dispatch(constants.KEY_GET_ALL_FAILURE, error)
        );
    }
};
