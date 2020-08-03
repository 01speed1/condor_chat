#!/bin/bash

npm i
( cd frontend && yarn install --check-files)
trap 'kill 0' EXIT
nodemon app.js &
( cd frontend && yarn start)
wait