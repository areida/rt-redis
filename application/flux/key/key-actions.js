'use strict';

import constants from './key-constants';
import Client    from './key-client';

export default (socket) => {
    let client = new Client(socket);

    return {
        clearValue()
        {
            this.dispatch(constants.CLEAR_VALUE);
        },
        getKey(key)
        {
            this.dispatch(constants.GET_KEY);

            return client.getKey(key).then(
                response => this.dispatch(constants.GET_KEY_SUCCESS, response)
            );
        },
        getKeys()
        {
            this.dispatch(constants.GET_KEYS);

            return client.getKeys().then(
                response => this.dispatch(constants.GET_KEYS_SUCCESS, response)
            );
        }
    };
};
