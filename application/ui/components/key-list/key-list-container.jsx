'use strict';

import React   from 'react';
import Fluxxor from 'fluxxor';
import _       from 'lodash';

import KeyList from './key-list';

const POLL_DELAY = 2500;

export default React.createClass({

    displayName : 'KeyListContainer',

    mixins : [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('Key')
    ],

    getStateFromFlux()
    {
        return {
            keys : this.getFlux().store('Key').keys
        };
    },

    componentDidMount()
    {
        this.poll();
    },

    poll()
    {
        this.getFlux().actions.key.getKeys().done(() => _.delay(this.poll, POLL_DELAY));
    },

    render()
    {
        return (
            <KeyList keys={this.state.keys} />
        );
    }
});
