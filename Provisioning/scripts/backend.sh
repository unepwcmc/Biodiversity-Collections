#!/usr/bin/env bash

cd /opt/Taxonomic-Database-Application
#Update script for new releases
sudo chmod +x update.sh

#Run the Rest API
cd ./Backend
sudo chmod +x gradlew
sudo ./gradlew build

#Installing the backend application as Linux service
sudo cp /vagrant/config/spring-boot /etc/init.d/taxonomic-db
sudo chmod 755 /etc/init.d/taxonomic-db
sudo update-rc.d taxonomic-db defaults
sudo echo -e "\n\MODE=service" >> /etc/environment;

service taxonomic-db start
