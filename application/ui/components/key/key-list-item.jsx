'use strict';

import React  from 'react';
import {Link} from 'react-router';

export default React.createClass({

    displayName : 'KeyListItem',

    propTypes : {
        keyString : React.PropTypes.string.isRequired
    },

    render()
    {
        return (
            <li className='row'>
                <Link
                    to        = 'key'
                    params    = {{key : this.props.keyString}}
                    className = 'large-12 columns'
                >
                    {this.props.keyString}
                </Link>
            </li>
        );
    }

});
