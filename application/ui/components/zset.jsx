'use strict';

import React      from 'react';
import Fluxxor    from 'fluxxor';
import Immutable  from 'immutable';
import jsonMarkup from 'json-markup';

export default React.createClass({

    displayName : 'ZSet',

    propTypes : {
        data : React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    renderItems(item, index)
    {
        let member = item.get('member');
        let score  = item.get('score');

        try {
            member = JSON.parse(member);
        } catch (x) {}

        try {
            score = JSON.parse(score);
        } catch (x) {}

        return (
            <li key={index} className='row'>
                <div className='large-1 columns'>
                    {index}
                </div>
                <div
                    className               = 'large-1 columns' 
                    dangerouslySetInnerHTML = {{__html : jsonMarkup(score)}}
                />
                <div
                    className               = 'large-10 columns'
                    dangerouslySetInnerHTML = {{__html : jsonMarkup(member)}}
                />
            </li>
        );
    },

    render()
    {
        return (
            <ul>
                <li>ZSET - {this.props.params.key}</li>
                {this.props.data.get('value').map(this.renderItems).toArray()}
            </ul>
        );
    }
});
