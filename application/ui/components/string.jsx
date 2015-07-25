'use strict';

import React     from 'react';
import Immutable from 'immutable';

import header from './header';
import Json   from './json';

export default React.createClass({

    displayName : 'String',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    render()
    {
        return (
            <ul>
                {header(this.props.data.get('key'), this.props.data.get('ttl'), this.props.data.get('type'))}
                <li className='row'>
                    <Json
                        className = 'col-xs'
                        text      = {this.props.data.get('value').get(0)}
                    />
                </li>
            </ul>
        );
    }
});
