#!/bin/bash

# clone repos
git clone git@github.com:hbod8/simplestats-api.git
git clone git@github.com:hbod8/simplestats-ui.git
git clone git@github.com:hbod8/angular-resume.git
git clone git@github.com:hbod8/prestorecording.com.git
git clone git@github.com:hbod8/default-website.git
git clone git@github.com:hbod8/eatkelp.com.git

# build
mkdir content

cd simplestats-ui
npm install
ng build
cp dist/simplestats-ui ../content
cd ..

cd simplestats-api
npm install
cd ..

cd angular-resume
npm install
cd ..

cd simplestats-ui
npm install
cd ..