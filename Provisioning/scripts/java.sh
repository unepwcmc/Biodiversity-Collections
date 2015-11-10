#!/usr/bin/env bash

sudo add-apt-repository ppa:webupd8team/java -y
sudo apt-get -y update
echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections

#Install Java 8
sudo apt-get install -y oracle-java8-installer