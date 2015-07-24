'use strict';

import React      from 'react';
import Fluxxor    from 'fluxxor';
import jsonMarkup from 'json-markup';

module.exports = React.createClass({

    displayName : 'ZSetPage',

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
                let member = item.member;

                try {
                    member = JSON.parse(member);
                } catch (x) {}

                let html = jsonMarkup(member);

                return (
                    <li key={index} className='row'>
                        <div className='large-1 columns'>
                            {index}
                        </div>
                        <div className='large-1 columns'>
                            {item.score}
                        </div>
                        <div className='large-10 columns' dangerouslySetInnerHTML={{__html : html}} />
                    </li>
                );
            }
        ).toArray();
    },

    render()
    {
        return (
            <ul>
                <li>ZSET - {this.props.params.key}</li>
                {this.renderItems()}
            </ul>
        );
    }

});
