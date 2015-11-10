#!/usr/bin/env bash

cd /opt/Biodiversity-Collections
#Update script for new releases
sudo chmod +x update.sh

#Run the Rest API
cd ./Backend
sudo chmod +x gradlew
sudo ./gradlew build

#Installing the backend application as Linux service
sudo cp /vagrant/config/spring-boot /etc/init.d/biodiversity
sudo chmod 755 /etc/init.d/biodiversity
sudo update-rc.d biodiversity defaults
sudo echo -e "\n\MODE=service" >> /etc/environment;

service biodiversity start