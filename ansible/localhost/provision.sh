#!/usr/bin/env bash

echo "Configuring the Server:"
export DEBIAN_FRONTEND=noninteractive

echo "  1/1. Upgrading all packages"
apt-get -y dist-upgrade &> /dev/null || exit 1

echo "Provisioning the Virtual Machine:"
cd /vagrant/ansible
ansible-playbook localhost/vagrant.yml --inventory-file=inventory/vagrant.ini --connection=local
