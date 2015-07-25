'use strict';

import Router from 'react-router';
import routes from './routes';

export default (location, res) => {
    if (typeof location === 'undefined') {
        location = Router.HistoryLocation;
    }

    let onAbort = res ? abortReason => {
        if (abortReason.constructor.name === 'Redirect') {
            return res.redirect(302, this.makePath(abortReason.to, abortReason.params, abortReason.query));
        }
    } : null;

    return Router.create({
        routes   : routes,
        location : location,
        onAbort  : onAbort
    });
};
