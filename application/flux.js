'use strict';

import Fluxxor from 'fluxxor';
import _       from 'lodash';

import Actions from './actions';
import Stores  from './stores';

export default class Flux extends Fluxxor.Flux {
    constructor(socket)
    {
        let actions = _.mapValues(Actions, Action => new Action(socket));
        let stores  = _.mapValues(Stores, Store => new Store());

        super(stores, actions);
    }
}

module.exports = Flux;
