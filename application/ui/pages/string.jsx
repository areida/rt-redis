'use strict';

import React      from 'react';
import Fluxxor    from 'fluxxor';
import jsonMarkup from 'json-markup';

module.exports = React.createClass({

    displayName : 'StringPage',

    mixins : [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('Key')
    ],

    getStateFromFlux()
    {
        return {
            value : this.getFlux().store('Key').value
        };
    },

    render()
    {
        let value = this.state.value.get(0);

        try {
            value = JSON.parse(value);
        } catch (x) {}

        let html = jsonMarkup(value);

        return (
            <ul>
                <li>STRING - {this.props.params.key}</li>
                <li dangerouslySetInnerHTML={{__html : html}} />
            </ul>
        );
    }

});
