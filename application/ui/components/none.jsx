'use strict';

import React     from 'react';
import Immutable from 'immutable';

import header from './header';

export default React.createClass({

    displayName : 'None',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    render()
    {
        return (
            <ul>
                {header(this.props.params.key, this.props.data.get('ttl'), this.props.data.get('type'))}
            </ul>
        );
    }
});
