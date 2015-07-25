'use strict';

import React     from 'react';
import Fluxxor   from 'fluxxor';

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

export default React.createClass({

    displayName : 'KeyPage',

    mixins : [
        Fluxxor.FluxMixin(React),
        Fluxxor.StoreWatchMixin('Key')
    ],

    getStateFromFlux()
    {
        return {
            data : this.getFlux().store('Key').data
        };
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
