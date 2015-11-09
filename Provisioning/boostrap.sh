#!/usr/bin/env bash

#Update and begin installing some utility tools
sudo apt-get -y update
sudo apt-get install -y python-software-properties
sudo apt-get -y update
sudo apt-get install -y git-core subversion curl
sudo apt-get install -y unzip
sudo apt-get install -y chkconfig
sudo apt-get install -y iptables

#Firewall rules
sudo /vagrant/scripts/firewall_rules.sh

#Install Java
sudo /vagrant/scripts/java.sh

#Install PostgreSQL
sudo /vagrant/scripts/postgres.sh

#Install WSO2
sudo /vagrant/scripts/wso2-esb.sh

#Git clone
sudo /vagrant/scripts/git_clone.sh

#Install Frontend
sudo /vagrant/scripts/frontend.sh

#Install Backend
sudo /vagrant/scripts/backend.sh

# Victory!
echo "You're all done! Your TaxonomicDB server is now running."
