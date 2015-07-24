var __HOSTNAME__ = process.env.HOST ? process.env.HOST : 'localhost';

var autoprefixer = require('autoprefixer-core');
var Webpack      = require('webpack');
var WebpackError = require('webpack-error-notification');
var path         = require('path');

var environment = (process.env.APP_ENV || 'development');
var npmPath     = path.resolve(__dirname, 'node_modules');
var config      = {
    devtools : [],
    entry    : ['./application/bootstrap.js'],
    plugins  : [
        new Webpack.DefinePlugin({
            __BACKEND__     : process.env.BACKEND ? '\'' + process.env.BACKEND + '\'' : undefined,
            __ENVIRONMENT__ : '\'' + environment + '\'',
            __HOSTNAME__    : '\'' + __HOSTNAME__ + '\'',
            "process.env"   : {
                NODE_ENV : '\'' + environment + '\''
            }
        })
    ],
    reactLoaders : ['babel'],
    sassOptions  : (
        '?outputStyle=' + (environment === 'production' ? 'compressed' : 'nested') +
        '&includePaths[]=' + npmPath
    )
};

if (environment !== 'production' && environment !== 'staging') {
    config.devtools = '#inline-source-map';
    config.entry = [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://' + __HOSTNAME__ + ':9000'
    ].concat(config.entry);

    config.reactLoaders = ['react-hot'].concat(config.reactLoaders);

    config.plugins.push(new Webpack.HotModuleReplacementPlugin());

    if (process.platform !== 'win32') {
        config.plugins.push(new WebpackError(process.platform));
    }
}

module.exports = [
    {
        name   : 'browser bundle',
        entry  : config.entry,
        output : {
            filename   : 'app.js',
            path       : path.resolve(__dirname, 'build'),
            publicPath : '/'
        },
        module : {
            preLoaders : [
                {
                    test    : /\.js$/,
                    loader  : 'jshint-loader',
                    exclude : npmPath
                },
                {
                    test    : /\.jsx$/,
                    loader  : 'jsxhint-loader',
                    exclude : npmPath
                }
            ],
            loaders : [
                {
                    test   : /\.(eot|ico|ttf|woff|woff2|gif|jpe?g|png|svg)$/,
                    loader : 'file-loader'
                },
                {
                    test    : /\.jsx?$/,
                    loaders : config.reactLoaders,
                    exclude : npmPath
                },
                {
                    test   : /\.json$/,
                    loader : 'json-loader'
                },
                {
                    test   : /\.scss$/,
                    loader : 'style!css!postcss!sass' + config.sassOptions
                },
                {
                    test   : /\.css$/,
                    loader : 'style!css'
                }
            ]
        },
        postcss : function() {
            return [autoprefixer];
        },
        plugins : config.plugins,
        resolve : {
            extensions : ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js']
        },
        devtool : config.devtools,
        jshint  : {
            esnext       : true,
            globalstrict : true,
            globals      : {
                __BACKEND__     : true,
                __ENVIRONMENT__ : true,
                __HOSTNAME__    : true,
                console         : true,
                File            : true,
                window          : true,
                document        : true,
                setTimeout      : true
            },
            maxdepth : 5
        }
    }
];
