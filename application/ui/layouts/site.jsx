'use strict';

import React                 from 'react';
import {RouteHandler, State} from 'react-router';
import Fluxxor               from 'fluxxor';

import KeyList from '../components/key-list/key-list-container';

export default React.createClass({

    displayName : 'SiteLayout',

    mixins : [Fluxxor.FluxMixin(React), State],

    getInitialState()
    {
        return {
            key : this.getParams().key
        };
    },

    render()
    {
        return (
            <div className='row'>
                <div className='col-lg-2'>
                    <KeyList />
                </div>
                <div className='col-lg-10'>
                    <RouteHandler params={this.getParams()} />
                </div>
            </div>
        );
    }
});
