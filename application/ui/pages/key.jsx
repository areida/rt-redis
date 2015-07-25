'use strict';

import React   from 'react';
import Fluxxor from 'fluxxor';
import {State} from 'react-router';
import _       from 'lodash';

import HashComponent   from '../components/hash';
import ListComponent   from '../components/list';
import NoneComponent   from '../components/none';
import SetComponent    from '../components/set';
import StringComponent from '../components/string';
import ZSetComponent   from '../components/zset';

let componentMap = {
    hash   : HashComponent,
    list   : ListComponent,
    none   : NoneComponent,
    set    : SetComponent,
    string : StringComponent,
    zset   : ZSetComponent
};

const POLL_DELAY = 1000;

export default React.createClass({

    displayName : 'KeyPage',

    mixins : [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('Key'),
        State
    ],

    getStateFromFlux()
    {
        return {
            data : this.getFlux().store('Key').data
        };
    },

    componentDidMount()
    {
        this.poll();
    },

    componentWillReceiveProps()
    {
        if (this.state.key !== this.getParams().key) {
            this.setState({key : this.getParams().key});
            this.getFlux().actions.key.clearValue();
        }
    },

    poll()
    {
        let params = this.getParams();

        if (params.key) {
            this.getFlux().actions.key.getKey(params.key).done(() => _.delay(this.poll, POLL_DELAY));
        } else {
            _.delay(this.poll, POLL_DELAY);
        }
    },

    render()
    {
        let type = this.state.data.get('type');

        if (type) {
            let Component = componentMap[type];

            return <Component data={this.state.data} params={this.props.params} />;
        } else {
            return null;
        }
    }
});
