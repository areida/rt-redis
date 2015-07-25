'use strict';

import React      from 'react';
import Immutable  from 'immutable';

import header from './header';
import Json   from './json';

export default React.createClass({

    displayName : 'ZSet',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    renderItems(item, index)
    {
        return (
            <li key={index} className='row'>
                <div className='col-xs-1'>
                    {index}
                </div>
                <Json
                    className = 'col-xs-1' 
                    text      = {item.get('score')}
                />
                <Json
                    className = 'col-xs'
                    text      = {item.get('member')}
                />
            </li>
        );
    },

    render()
    {
        return (
            <ul>
                {header(this.props.params.key, this.props.data.get('ttl'), this.props.data.get('type'))}
                {this.props.data.get('value').map(this.renderItems).toArray()}
            </ul>
        );
    }
});
