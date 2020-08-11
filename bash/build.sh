#!/bin/bash
npm i
rm -rf frontend/build
(cd frontend && yarn install --check-files)
(cd frontend && yarn build)
rm -rf docs
mkdir docs
mv frontend/build/* docs/
