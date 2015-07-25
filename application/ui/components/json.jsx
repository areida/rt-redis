'use strict';

import React      from 'react';
import jsonMarkup from 'json-markup';

export default React.createClass({

    displayName : 'Json',

    propTypes : {
        text : React.PropTypes.string.isRequired
    },

    render()
    {
        let text = this.props.text;

        try {
            text = JSON.parse(text);
        } catch (x) {}

        return (
            <div
                {...this.props}
                dangerouslySetInnerHTML = {{__html : jsonMarkup(text)}}
            />
        );
    }
});
