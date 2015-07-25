'use strict';

var fs   = require('fs');
var tmpl = require('blueimp-tmpl').tmpl;

tmpl.load = function (name) {
    return fs.readFileSync(process.cwd() + '/application/' + name, 'utf8');
};

module.exports = function(req, res) {
    res.send(tmpl('index.html', {}));
};
