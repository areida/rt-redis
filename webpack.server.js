var __HOSTNAME__ = process.env.HOST ? process.env.HOST : 'localhost';

var autoprefixer      = require('autoprefixer-core');
var Webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackError      = require('webpack-error-notification');
var path              = require('path');
var fs                = require('fs');
var exec              = require('child_process').exec;

var environment = (process.env.APP_ENV || 'development');
var npmPath     = path.resolve(__dirname, 'node_modules');
var config      = {
    externals : {},
    plugins     : [
        new ExtractTextPlugin('app.css', {allChunks : true}),
        new Webpack.DefinePlugin({
            __BACKEND__     : process.env.BACKEND ? '\'' + process.env.BACKEND + '\'' : undefined,
            __ENVIRONMENT__ : '\'' + environment + '\'',
            __HOSTNAME__    : '\'' + __HOSTNAME__ + '\''
        }),
        function () {
            this.plugin('done', function () {
                exec('pm2 restart server', function (error, output) {
                    console.log(output);
                });
            });
        }
    ],
    sassOptions  : (
        '?outputStyle=' + (environment === 'production' ? 'compressed' : 'nested') +
        '&includePaths[]=' + npmPath
    )
};

fs.readdirSync('node_modules')
    .filter(
        function (x) {
            return ['.bin'].indexOf(x) === -1;
        }
    )
    .forEach(
        function (mod) {
            config.externals[mod] = 'commonjs ' + mod;
        }
    );

if (environment !== 'production') {
    config.entry = [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://' + __HOSTNAME__ + ':9000'
    ].concat(config.entry);

    if (process.platform !== 'win32') {
        config.plugins.push(new WebpackError(process.platform));
    }
}

module.exports = [
    {
        name   : 'server bundle',
        entry  : './server/render.js',
        target : 'node',
        output : {
            filename      : '../server/render-generated.js',
            libraryTarget : 'commonjs2',
            path          : path.resolve(__dirname, 'build')
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
                    loaders : ['babel'],
                    exclude : npmPath
                },
                {
                    test   : /\.json$/,
                    loader : 'json-loader'
                },
                {
                    test   : /\.scss$/,
                    loader : ExtractTextPlugin.extract(
                        'style-loader',
                        'css-loader!postcss-loader!sass-loader' + config.sassOptions
                    )
                }
            ]
        },
        postcss : function() {
            return [autoprefixer];
        },
        externals : config.externals,
        plugins   : config.plugins,
        resolve   : {
            extensions : ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js']
        },
        jshint  : {
            esnext       : true,
            globalstrict : true,
            globals      : {
                __BACKEND__     : true,
                __ENVIRONMENT__ : true,
                __HOSTNAME__    : true,
                console         : true,
                document        : true,
                File            : true,
                localStorage    : true,
                navigator       : true,
                setTimeout      : true,
                window          : true
            }
        }
    }
];
