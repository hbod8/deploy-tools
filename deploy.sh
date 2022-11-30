#!/bin/bash
# ensure docker is off to ensure there is no port collision with certbot
docker-compose down --remove-orphans
# update SSL certs
certbot \
  certonly\
  --standalone\
  --expand\
  -n\
  -d harry.technology\
  -d www.harry.technology\
  -d resume.harry.technology\
  -d admin.harry.technology\
  -d prestorecording.com\
  -d www.prestorecording.com\
  -d harrysaliba.com\
  -d www.harrysaliba.com\
  -d resume.harrysaliba.com\
  -d apsaliba.com\
  -d www.apsaliba.com\
  -d sahleebah.com\
  -d www.sahleebah.com\
  -d lizsaliba.com\
  -d www.lizsaliba.com\
  -d eatkelp.com\
  -d www.eatkelp.com\
  -d saliba.family\
  -d www.saliba.family
cp -r /etc/letsencrypt/live/harry.technology/ ./certs
# pull from repo
git pull
# build
docker-compose build
# run
docker-compose up -d