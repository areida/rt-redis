#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
    echo 'Missing APP_ENV parameter'
    exit 0
fi

rm -rf ./build
rm -rf ./dist
mkdir dist
NODE_ENV=$1 APP_ENV=$1 webpack -p
NODE_ENV=$1 APP_ENV=$1 webpack -p --config webpack.server.js
zip -r dist/build-frontend-$1 \
    application \
    build \
    server \
    node_modules/blueimp-tmpl \
    node_modules/express \
    node_modules/express-http-proxy \
    node_modules/lodash
