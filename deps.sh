#!/bin/bash

set -o errexit

apt-get -q update
apt-get install -y wireless-tools libcairo2-dev
