'use strict';

var fs   = require('fs');
var tmpl = require('blueimp-tmpl').tmpl;

var config = require('../application/config');

tmpl.load = function (name) {
    return fs.readFileSync(process.cwd() + '/application/' + name, 'utf8');
};

module.exports = function(req, res) {
    res.send(tmpl('index.html', {
        css   : true,
        title : config.app.title
    }));
};
