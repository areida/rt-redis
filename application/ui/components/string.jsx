'use strict';

import React      from 'react';
import Immutable  from 'immutable';
import jsonMarkup from 'json-markup';

export default React.createClass({

    displayName : 'String',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    render()
    {
        let value = this.props.data.get('value').get(0);

        try {
            value = JSON.parse(value);
        } catch (x) {}

        return (
            <ul>
                <li>STRING - {this.props.params.key}</li>
                <li dangerouslySetInnerHTML={{__html : jsonMarkup(value)}} />
            </ul>
        );
    }
});
