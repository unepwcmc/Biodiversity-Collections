#!/bin/bash

# iptables example configuration script
#
# Flush all current rules from iptables
#
iptables -F
#
# Allow SSH connections on tcp port 22
# This is essential when working on remote servers via SSH to prevent locking yourself out of the system
#
iptables -A INPUT -p tcp --dport 22 -j ACCEPT #SSH
iptables -A INPUT -p tcp --dport 80 -j ACCEPT #Web Server
iptables -A INPUT -p tcp --dport 8080 -j ACCEPT #REST API
iptables -A INPUT -p tcp --dport 9443 -j ACCEPT #WSO2 ESB Console
iptables -A INPUT -p tcp --dport 5432 -j ACCEPT #PostgreSQL
#
# Set default policies for INPUT, FORWARD and OUTPUT chains
#
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
#
# Set access for localhost
#
iptables -A INPUT -i lo -j ACCEPT
#
# Accept packets belonging to established and related connections
#
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
#
# Save settings
#
sudo iptables-save
#
# List rules
#
iptables -L -v
