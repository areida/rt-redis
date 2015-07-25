'use strict';

import SocketClient from '../socket-client';

export default class KeyClient extends SocketClient {
    getKey(key)
    {
        return this.socketRequest('key', key);
    }

    getKeys()
    {
        return this.socketRequest('keys');
    }
}
