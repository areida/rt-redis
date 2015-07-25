'use strict';

import React     from 'react';
import Immutable from 'immutable';

import header from './header';
import Json   from './json';

export default React.createClass({

    displayName : 'Set',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    renderItem(member, index)
    {
        return (
            <li key={index} className='row'>
                <Json
                    className = 'col-xs'
                    text      = {member}
                />
            </li>
        );
    },

    render()
    {
        return (
            <ul>
                {header(this.props.params.key, this.props.data.get('ttl'), this.props.data.get('type'))}
                {this.props.data.get('value').map(this.renderItem).toArray()}
            </ul>
        );
    }
});
