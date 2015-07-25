'use strict';

import Q from 'q';

export default (socket) => {
    return {
        socketRequest(method, path)
        {
            return new Q.promise(
                (resolve, reject) => {
                    socket.emit(
                        method,
                        path,
                        response => {
                            resolve(response);
                        }
                    );
                }
            );
        },

        getKey(key)
        {
            return this.socketRequest('key', key);
        },

        getKeys()
        {
            return this.socketRequest('keys');
        }
    };
};
