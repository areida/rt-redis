'use strict';

import React      from 'react';
import Immutable  from 'immutable';
import jsonMarkup from 'json-markup';

export default React.createClass({

    displayName : 'Hash',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    renderItem(value, key)
    {
        try {
            value = JSON.parse(value);
        } catch (x) {}

        return (
            <li className='row' key={key}>
                <div className='large-2 columns'>{key}</div>
                <div
                    className               = 'large-10 columns'
                    dangerouslySetInnerHTML = {{__html : jsonMarkup(value)}}
                />
            </li>
        );
    },

    render()
    {
        return (
            <ul>
                <li>HASH - {this.props.params.key}</li>
                {this.props.data.get('value').map(this.renderItem).toArray()}
            </ul>
        );
    }
});
