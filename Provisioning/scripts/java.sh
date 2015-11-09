#!/usr/bin/env bash
sudo add-apt-repository ppa:webupd8team/java -y
sudo apt-get -y update
echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections

#Install Java 8
sudo apt-get install -y oracle-java8-installer

#Install Java 7
#sudo apt-get -y install oracle-java7-installer
#sudo echo -e "\n\nJAVA_HOME=/usr/lib/jvm/java-7-oracle" >> /etc/environment;
#export JAVA_HOME=/usr/lib/jvm/java-7-oracle/
