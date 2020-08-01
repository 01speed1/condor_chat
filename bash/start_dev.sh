#!/bin/bash

npm i
trap 'kill 0' EXIT
nodemon app.js &
( cd frontend && yarn start)
wait