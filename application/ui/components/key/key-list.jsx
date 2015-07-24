'use strict';

import React  from 'react';
import {List} from 'immutable';

import KeyListItem from './key-list-item';

module.exports = React.createClass({

    displayName : 'KeyList',

    propTypes : {
        keys : React.PropTypes.instanceOf(List)
    },

    render()
    {
        return (
            <ul>
                {this.props.keys.toJS().map(
                    item => (
                        <KeyListItem item={item} key={item.key} />
                    )
                )}
            </ul>
        );
    }

});
