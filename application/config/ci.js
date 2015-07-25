/* globals __BACKEND__ */
'use strict';

var backend;

backend = __BACKEND__ || '%QA_API_HOST%';

export default {
    proxy : {
        hostname : backend
    }
};
