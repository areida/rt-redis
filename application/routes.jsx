/* jshint unused: false */
'use strict';

import React  from 'react'; // Used in compiled js, so required even though appears unused
import Router from 'react-router';

import SiteLayout   from './ui/layouts/site';
import KeyPage      from './ui/pages/key';
import NotFoundPage from './ui/pages/404';

let {Route, Redirect} = Router;

export default (
    <Route>
        <Route path='/' handler={SiteLayout}>
            <Route path='/k/:key/?' name='key' handler={KeyPage} />
        </Route>
        <Route path='/*' name='404' handler={NotFoundPage}/>
    </Route>
);
