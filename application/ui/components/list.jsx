'use strict';

import React      from 'react';
import Fluxxor    from 'fluxxor';
import Immutable  from 'immutable';
import jsonMarkup from 'json-markup';

export default React.createClass({

    displayName : 'List',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    renderItem(member, index)
    {
        try {
            member = JSON.parse(member);
        } catch (x) {}

        return (
            <li className='row' key={index}>
                <div className='large-1 columns'>{index}</div>
                <div
                    className               = 'large-11 columns'
                    dangerouslySetInnerHTML = {{__html : jsonMarkup(member)}}
                />
            </li>
        );
    },

    render()
    {
        return (
            <ul>
                <li>LIST - {this.props.params.key}</li>
                {this.props.data.get('value').map(this.renderItem).toArray()}
            </ul>
        );
    }
});
