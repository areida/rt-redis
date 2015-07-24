'use strict';

import React      from 'react';
import Fluxxor    from 'fluxxor';
import jsonMarkup from 'json-markup';

module.exports = React.createClass({

    displayName : 'SetPage',

    mixins : [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('Key')
    ],

    getStateFromFlux()
    {
        return {
            members : this.getFlux().store('Key').value
        };
    },

    renderItems()
    {
        return this.state.members.map(
            (member, index) => {
                try {
                    member = JSON.parse(member);
                } catch (x) {}

                let html = jsonMarkup(member);

                return <li key={index} dangerouslySetInnerHTML={{__html : html}} />;
            }
        ).toArray();
    },

    render()
    {
        return (
            <ul>
                <li>SET - {this.props.params.key}</li>
                {this.renderItems()}
            </ul>
        );
    }

});
