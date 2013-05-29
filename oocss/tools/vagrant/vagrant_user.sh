#!/bin/bash

echo "Auto Provisionning Starting"
cd /home/vagrant
cat .profile | grep make\ start && echo "Installed" || echo     "cd /vagrant; make start" >> .profile