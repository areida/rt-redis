/* globals window, io */
'use strict';

import config           from './config';
import React            from 'react';
import {batchedUpdates} from 'react/lib/ReactUpdates';

// initialize i18n
if (! window.Intl) {
    window.Intl = require('intl');
}

import i18n   from './intl/intl';
import Flux   from './flux';
import Router from './router';

require('./media.js');

window.React = React;

React.initializeTouchEvents(true);

let socket = io.connect('http://localhost:9090');

socket.on('connect', () => {
    let flux        = new Flux(socket);
    let oldDispatch = flux.dispatcher.dispatch.bind(flux.dispatcher);
    let router      = new Router();
    let state       = window.document.getElementById('server-state');

    flux.dispatcher.dispatch = action => {
        return batchedUpdates(
             () => {
                oldDispatch(action);
            }
        );
    };

    if (state) {
        flux = flux.fromObject(window.__STATE__);

        if (state.remove) {
            state.remove();
        } else if (state.removeNode) {
            state.removeNode();
        }
    }

    router.run(
        (Handler, state) => {
            let locales;

            if (typeof window.navigator.languages !== 'undefined') {
                locales = window.navigator.languages;
            } else if(typeof window.navigator.language !== 'undefined') {
                locales = [window.navigator.language];
            } else {
                locales = ['en-US'];
            }

            if (
                (locales.indexOf('en-US') === -1) &&
                (locales.indexOf('en-us') === -1)
            ) {
                locales.push('en-US');
            }

            window.document.title = flux.getTitle(state, config.app.title);

            React.render(
                React.createElement(Handler, {
                    flux     : flux,
                    locales  : locales,
                    messages : i18n.messages
                }),
                window.document.getElementById('app')
            );
        }
    );
});
