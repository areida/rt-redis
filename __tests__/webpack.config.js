/* globals process, __dirname */
'use strict';

var Webpack      = require('webpack');
var HtmlWebpack  = require('html-webpack-plugin');
var WebpackError = require('webpack-error-notification');
var path         = require('path');

var environment = 'development';
var config      = {
    entry   : [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:9999',
        './tests.js'
    ],
    plugins : [
        new HtmlWebpack({template : './index.html'}),
        new Webpack.DefinePlugin({
            __BACKEND__     : process.env.BACKEND,
            __ENVIRONMENT__ : '\''+environment+'\''
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new WebpackError(process.platform)
    ],
    reactLoaders : ['react-hot', 'jsx?insertPragma=React.DOM']
};

module.exports = {
    name   : 'test bundle',
    entry  : config.entry,
    output : {
        filename   : 'tests.js',
        path       : path.resolve(__dirname + '/../test'),
        publicPath : '/'
    },
    module : {
        loaders : [
            {
                test   : /\.(ico|jpg|png)$/,
                loader : 'file-loader',
                query  : {name : '[path][name].[ext]'}
            },
            {
                test   : /(favicon|mocha|sinon)\.js$/,
                loader : 'file-loader',
                query  : {name : '[name].js'}
            },
            {
                test    : /\.jsx$/,
                loaders : config.reactLoaders,
                exclude : /node_modules/
            },
            {
                test   : /\.json$/,
                loader : 'json-loader'
            },
            {
                test   : /\.css$/,
                loader : 'style!css'
            },
            {
                test   : /\.scss$/,
                loader : 'null-loader'
            }
        ]
    },
    plugins : config.plugins,
    resolve : {
        extensions : ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js']
    }
};
