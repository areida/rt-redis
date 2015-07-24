'use strict';

import React      from 'react';
import Fluxxor    from 'fluxxor';
import jsonMarkup from 'json-markup';

module.exports = React.createClass({

    displayName : 'ListPage',

    mixins : [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('Key')
    ],

    getStateFromFlux()
    {
        return {
            items : this.getFlux().store('Key').value
        };
    },

    renderItems()
    {
        return this.state.items.map(
            (item, index) => {
                try {
                    item = JSON.parse(item);
                } catch (x) {}

                let html = jsonMarkup(item);

                return (
                    <li className='row' key={index}>
                        <div className='large-1 columns'>{index}</div>
                        <div className='large-11 columns' dangerouslySetInnerHTML={{__html : html}} />
                    </li>
                );
            }
        ).toArray();
    },

    render()
    {
        return (
            <ul>
                <li>LIST - {this.props.params.key}</li>
                {this.renderItems()}
            </ul>
        );
    }

});
