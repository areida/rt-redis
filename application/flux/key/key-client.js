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

        get(key)
        {
            return this.socketRequest('GET', key);
        },

        getAll()
        {
            return this.socketRequest('KEYS');
        }
    };
};
