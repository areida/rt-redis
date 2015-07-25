'use strict';

import React     from 'react';
import Immutable from 'immutable';

import header from './header';
import Json   from './json';

export default React.createClass({

    displayName : 'Hash',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    renderItem(value, key)
    {
        return (
            <li className='row' key={key}>
                <div className='col-xs-2'>{key}</div>
                <Json
                    className = 'col-xs'
                    text      = {value}
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
