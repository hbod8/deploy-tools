#!/bin/bash
set -e

# refresh sources
sudo apt update

# install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh