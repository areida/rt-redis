'use strict';

import config      from '../../config';
import HttpGateway from 'synapse-common/http/auth-gateway';

let KeyClient = HttpGateway.extend({

    config : config.api,

    get(key)
    {
        return this.apiRequest('GET', `/key/${key}`);
    },

    getAll()
    {
        return this.apiRequest('GET', '/keys');
    }
});

module.exports = new KeyClient();
