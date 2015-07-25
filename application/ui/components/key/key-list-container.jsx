'use strict';

import React   from 'react';
import Fluxxor from 'fluxxor';

import KeyList from './key-list';

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

    render()
    {
        return (
            <KeyList keys={this.state.keys} />
        );
    }
});
