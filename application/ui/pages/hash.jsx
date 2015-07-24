'use strict';

import React      from 'react';
import Fluxxor    from 'fluxxor';
import jsonMarkup from 'json-markup';

module.exports = React.createClass({

    displayName : 'HashPage',

    mixins : [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('Key')
    ],

    getStateFromFlux()
    {
        return {
            pairs : this.getFlux().store('Key').value
        };
    },

    renderItems()
    {
        return this.state.pairs.map(
            (value, key) => {
                try {
                    value = JSON.parse(value);
                } catch (x) {}

                let html = jsonMarkup(value);

                return (
                    <li className='row' key={key}>
                        <div className='large-2 columns'>{key}</div>
                        <div className='large-2 columns' dangerouslySetInnerHTML={{__html : html}} />
                    </li>
                );
            }
        ).toArray();
    },

    render()
    {
        return (
            <ul>
                <li>HASH - {this.props.params.key}</li>
                {this.renderItems()}
            </ul>
        );
    }

});
