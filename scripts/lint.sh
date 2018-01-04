#!/bin/bash

set -o errexit

cd client
yarn run lint

cd ../server
yarn run lint
cd ..
