'use strict';

import React                 from 'react';
import {RouteHandler, State} from 'react-router';
import classNames            from 'classnames';
import Fluxxor               from 'fluxxor';
import _                     from 'lodash';

import KeyList from '../components/key/key-list-container';

let FluxMixin = Fluxxor.FluxMixin(React);

module.exports = React.createClass({

    displayName : 'SiteLayout',

    mixins : [Fluxxor.FluxMixin(React), State],

    getInitialState()
    {
        return {
            key : this.getParams().key
        };
    },

    componentDidMount()
    {
        this.pollKey();
        this.pollKeys();
    },

    componentWillReceiveProps()
    {
        if (this.state.key !== this.getParams().key) {
            this.setState({key : this.getParams().key});
            this.getFlux().actions.key.clearValue();
        }
    },

    pollKey()
    {
        let params = this.getParams();
        let route  = _.last(this.getRoutes());

        if (params.key) {
            this.getFlux().actions.key.get(route.name, params.key).done(() => _.delay(this.pollKey, 1000));
        } else {
            _.delay(this.pollKey, 1000);
        }
    },

    pollKeys()
    {
        this.getFlux().actions.key.getAll().done(() => _.delay(this.pollKeys, 1000));
    },

    render()
    {
        let classes = {
            'row' : true
        };

        return (
            <div className={classNames(classes)}>
                <div className='large-3 columns'>
                    <KeyList />
                </div>
                <div className='large-9 columns'>
                    <RouteHandler />
                </div>
            </div>
        );
    }
});
