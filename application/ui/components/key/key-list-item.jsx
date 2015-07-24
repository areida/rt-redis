'use strict';

import React  from 'react';
import {Link} from 'react-router';

module.exports = React.createClass({

    displayName : 'KeyListItem',

    propTypes : {
        item : React.PropTypes.shape({
            key  : React.PropTypes.string.isRequired,
            type : React.PropTypes.oneOf([
                'hash',
                'list',
                'set',
                'string',
                'zset'
            ]).isRequired
        }).isRequired
    },

    render()
    {
        return (
            <li className='row'>
                <Link
                    to        = {this.props.item.type}
                    params    = {{key : this.props.item.key}}
                    className = 'large-12 columns'
                >
                    {this.props.item.key}
                </Link>
            </li>
        );
    }

});
