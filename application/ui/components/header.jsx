'use strict';

import React from 'react';

export default (key, ttl, type) => [
    <li className='row' key={0}>
        <div className='col-xs'>{key} - {type}</div>
    </li>,
    <li className='row' key={1}>
        <div className='col-xs'>{ttl}</div>
    </li>
];
