'use strict';

import React     from 'react';
import Fluxxor   from 'fluxxor';
import Immutable from 'immutable';
import _         from 'lodash';

import HashComponent   from '../components/hash';
import ListComponent   from '../components/list';
import SetComponent    from  '../components/set';
import StringComponent from '../components/string';
import ZSetComponent   from '../components/zset';

let componentMap = {
    hash   : HashComponent,
    list   : ListComponent,
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

    propTypes : {
        data : React.PropTypes.oneOf([
            React.PropTypes.instanceOf(Immutable.List),
            React.PropTypes.instanceOf(Immutable.Map)]
        ).isRequired
    },

    getStateFromFlux()
    {
        return {
            data : this.getFlux().store('Key').data
        };
    },

    render()
    {
        if (this.state.data.get('type')) {
            let Component = componentMap[this.state.data.get('type')];

            return <Component data={this.state.data} params={this.props.params} />;
        }

        return null;
    }

});
