'use strict';

import React           from 'react';
import IntlHelperMixin from 's19n';

module.exports = React.createClass({

    displayName : '404',

    mixins: [
        IntlHelperMixin
    ],

    render()
    {
        let style1 = {
            'textAlign'  : 'center',
            'marginTop'  : '200px',
            'fontSize'   : '180px',
            'fontWeight' : 'bold'
        };

        let style2 = {
            'textAlign' : 'center',
            'fontSize'  : '20px'
        };

        return (
            <div>
                <h1 style={style1}>{'404'}</h1>
                <h2 style={style2}>{this.t('404.site-not-found')}</h2>
            </div>
        );

    }

});
