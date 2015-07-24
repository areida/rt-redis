'use strict';

module.exports = {
    api : {
        hostname : '%PRODUCTION_APP_HOST%',
        port     : 80
    },
    proxy : {
        hostname : '%PRODUCTION_API_HOST%'
    }
};
