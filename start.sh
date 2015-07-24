#!/usr/bin/env bash

trap "pm2 delete all > /dev/null 2>&1" EXIT

rm -rf build

pm2 delete all > /dev/null 2>&1

pm2 start dev-server.js
pm2 start server

echo 'Press [CMD+C] to stop servers...'
while :
do
    sleep 1
done
