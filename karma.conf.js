'use strict';

module.exports = function(config) {
    config.set({

    basePath : '',

    frameworks : ['mocha', 'sinon-chai'],

    files : [
        './node_modules/es5-shim/es5-shim.js',
        // need to figure out how to get webpack to take a glob w/o duplicating
        // stuff everywhere
        '__tests__/index.js'
    ],

    exclude : [],

    preprocessors : {
        '__tests__/index.js'  : ['webpack', 'sourcemap']
    },

    webpack: {
        cache  : true,
        module : {
            loaders : [
                {
                    test   : /\.(ico|jpg|png)$/,
                    loader : 'file-loader',
                    query  : {name : '[path][name].[ext]?[hash]'}
                },
                {
                    test   : /\.jsx$/,
                    loader : 'jsx?insertPragma=React.DOM'
                },
                {
                    test   : /\.css$/,
                    loader : 'style!css'
                }
            ]
        },
        resolve : {
            extensions : ['', '.js', '.json', '.jsx', '.webpack.js', '.web.js']
        }
    },

    webpackServer : {
        stats : {
            colors : true
        }
    },

    reporters : ['progress', 'junit'],

    port : 9876,

    colors : true,

    logLevel : config.LOG_INFO,

    autoWatch : true,

    browsers : ['Chrome', 'Firefox', 'PhantomJS'],

    captureTimeout : 60000,

    singleRun : false,

    junitReporter: {
        outputFile: 'shippable/testresults/unit.xml',
        suite: ''
    },

    customLaunchers: {
      Chrome_without_sandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox'] // with sandbox it fails under Docker
      }
    },

    plugins: [
            require('karma-mocha'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-sinon-chai'),
            require('karma-junit-reporter'),
            require('karma-sourcemap-loader'),
            require('karma-webpack')
        ]
    });
};
