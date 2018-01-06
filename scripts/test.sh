#!/bin/bash

set -o errexit

cd client
yarn run test

cd ../server
yarn run test
cd ..
