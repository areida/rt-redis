'use strict';

import Q from 'q';

export default class Client {
    constructor(socket)
    {
        this.socket = socket;
    }

    socketRequest(method, path)
    {
        return new Q.promise(
            (resolve, reject) => {
                this.socket.emit(
                    method,
                    path,
                    response => {
                        resolve(response);
                    }
                );
            }
        );
    }
}
