#!/usr/bin/env bash

#Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib
#Start when booting
chkconfig postgresql on

#Config the Server
su - postgres -c "createdb taxonomic"
su - postgres -c "psql -U postgres -d postgres -c \"alter user postgres with password ')fmK?jPeWhq6KMwm';\""

sudo cp /vagrant/config/postgres/postgresql.conf /etc/postgresql/9.1/main/postgresql.conf
sudo chown postgres:postgres /etc/postgresql/9.1/main/postgresql.conf
sudo cp /vagrant/config/postgres/pg_hba.conf /etc/postgresql/9.1/main/pg_hba.conf
sudo chown postgres:postgres /etc/postgresql/9.1/main/pg_hba.conf

sudo service postgresql restart

sudo apt-get install -y postgis postgresql-9.3-postgis-2.1
sudo -u postgres psql -c "CREATE EXTENSION postgis; CREATE EXTENSION postgis_topology;" taxonomic
