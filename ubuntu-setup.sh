#!/bin/bash
set -e

# refresh sources
sudo apt update

# install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo apt install docker-compose
sudo systemctl enable docker
sudo docker-compose up -d