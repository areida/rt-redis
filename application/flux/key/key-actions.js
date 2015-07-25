'use strict';

import constants from './key-constants';
import Client    from './key-client';

export default (socket) => {
    let client = new Client(socket);

    return {
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
};
