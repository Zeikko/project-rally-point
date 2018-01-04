#!/bin/bash

set -o errexit

cd client
yarn install

cd ../server
yarn install
cd ..
