'use strict';

import React     from 'react';
import Immutable from 'immutable';

import header from './header';
import Json   from './json';

export default React.createClass({

    displayName : 'List',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    renderItem(member, index)
    {
        return (
            <li className='row' key={index}>
                <div className='col-xs-1'>{index}</div>
                <Json
                    className = 'col-xs'
                    tex       = {member}
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
