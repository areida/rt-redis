'use strict';

import React          from 'react';
import {RouteHandler} from 'react-router';
import Fluxxor        from 'fluxxor';

import KeyList from '../components/key-list';

export default React.createClass({

    displayName : 'SiteLayout',

    mixins : [Fluxxor.FluxMixin(React)],

    render()
    {
        return (
            <div className='row'>
                <div className='col-lg-2'>
                    <KeyList />
                </div>
                <div className='col-lg-10'>
                    <RouteHandler />
                </div>
            </div>
        );
    }
});
