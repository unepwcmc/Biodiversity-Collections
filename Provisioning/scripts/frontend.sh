#!/usr/bin/env bash

# Install Nginx
sudo apt-get install -y nginx
sudo rm /etc/nginx/sites-enabled/default
cp /vagrant/config/nginx/default /etc/nginx/sites-enabled/default

# Add nodejs repo
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get -y update

# Install nodejs
sudo apt-get install -y nodejs

# Install bower
sudo npm install -g bower

#Install Grunt
sudo npm install -g grunt-cli

#Install Frontend Dependencies
cd /opt/Biodiversity-Collections
#Update script for new releases
chmod +x update.sh

cd ./Frontend
npm install
bower install --no-interactive
grunt setup
grunt deploy --force

# Run the Frontend
sudo service nginx restart