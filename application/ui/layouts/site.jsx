'use strict';

import React                 from 'react';
import {RouteHandler, State} from 'react-router';
import Fluxxor               from 'fluxxor';
import _                     from 'lodash';

import KeyList from '../components/key/key-list-container';

const KEY_TIMEOUT  = 1000;
const KEYS_TIMEOUT = 2500;

export default React.createClass({

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

        if (params.key) {
            this.getFlux().actions.key.getKey(params.key).done(() => _.delay(this.pollKey, KEY_TIMEOUT));
        } else {
            _.delay(this.pollKey, KEY_TIMEOUT);
        }
    },

    pollKeys()
    {
        this.getFlux().actions.key.getKeys().done(() => _.delay(this.pollKeys, KEYS_TIMEOUT));
    },

    render()
    {
        return (
            <div className='row'>
                <div className='large-3 columns'>
                    <KeyList />
                </div>
                <div className='large-9 columns'>
                    <RouteHandler params={this.getParams()} />
                </div>
            </div>
        );
    }
});
