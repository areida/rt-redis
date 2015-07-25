'use strict';

import React      from 'react';
import Fluxxor    from 'fluxxor';
import Immutable  from 'immutable';
import jsonMarkup from 'json-markup';

export default React.createClass({

    displayName : 'Set',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    renderItem(member, index)
    {
        try {
            member = JSON.parse(member);
        } catch (x) {}

        return (
            <li
                key                     = {index}
                dangerouslySetInnerHTML = {{__html : jsonMarkup(member)}}
            />
        );
    },

    render()
    {
        return (
            <ul>
                <li>SET - {this.props.params.key}</li>
                {this.props.data.get('value').map(this.renderItem).toArray()}
            </ul>
        );
    }

});
