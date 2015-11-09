# Biodiversity-Collections

###How to Use
1. Download and install VirtualBox by [clicking here](https://www.virtualbox.org/wiki/Downloads)
2. Download and install Vagrant by [clicking here](http://downloads.vagrantup.com/)
3. Clone this repository.
4. Enter into Provisioning folder
5. vagrant up

Grab a cup of coffee while you wait for the server to download and install.
This will take a little while depending on your internet connection.Once you run it the first time,
you can access call 10.10.10.85:8080 for Rest API

###Further Reading
- [Vagrant Documentation](http://docs.vagrantup.com/v2/getting-started/index.html)
- [PostgreSQL](http://www.postgresql.org/)
- [Gradle](https://gradle.org/)
- [Spring Boot](http://projects.spring.io/spring-boot/)

###Version
- vagrant 1.4.3
- virtualbox 4.3.8 r92456

###Commands
- vagrant up for turn on the Taxonomic DB Server
- vagrant halt for turn off the Server instance
- vagrant up --provision for turn on the Taxonomic DB Server and run the project.
