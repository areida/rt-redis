/* jshint unused: false */
'use strict';

import React  from 'react'; // Used in compiled js, so required even though appears unused
import Router from 'react-router';

import SiteLayout   from './ui/layouts/site';
import HashPage     from './ui/pages/hash';
import ListPage     from './ui/pages/list';
import SetPage      from './ui/pages/set';
import StringPage   from './ui/pages/string';
import ZSetPage     from './ui/pages/zset';
import NotFoundPage from './ui/pages/404';

let {Route, Redirect} = Router;

module.exports = (
    <Route>
        <Route path='/' handler={SiteLayout}>
            <Route path ='hash/:key/?' name='hash' handler={HashPage} />
            <Route path ='list/:key/?' name='list' handler={ListPage} />
            <Route path ='set/:key/?' name='set' handler={SetPage} />
            <Route path ='string/:key/?' name='string' handler={StringPage} />
            <Route path ='zset/:key/?' name='zset' handler={ZSetPage} />
        </Route>
        <Route path='/*' name='404' handler={NotFoundPage}/>
    </Route>
);
