require('./ui/scss/app');
require('json-markup/style.css');

require('!file-loader?name=[name].[ext]!./index.html');
require('!file-loader?name=[path][name].[ext]!../static-media/icons/favicon.png');
