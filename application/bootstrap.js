'use strict';

import config           from './config';
import React            from 'react';
import {batchedUpdates} from 'react/lib/ReactUpdates';

import Flux   from './flux';
import Router from './router';

require('./media.js');

window.React = React;

React.initializeTouchEvents(true);

let socket = io.connect('http://localhost:9090');

window.document.title = config.app.title;

socket.on('connect', () => {
    let flux        = new Flux(socket);
    let oldDispatch = flux.dispatcher.dispatch.bind(flux.dispatcher);
    let router      = new Router();

    flux.dispatcher.dispatch = action => {
        return batchedUpdates(
             () => {
                oldDispatch(action);
            }
        );
    };

    router.run(
        (Handler, state) => {
            React.render(
                React.createElement(Handler, {
                    flux : flux
                }),
                window.document.getElementById('app')
            );
        }
    );
});
