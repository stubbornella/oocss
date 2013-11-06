#!/bin/bash

echo "Auto Provisionning Starting"
cd /home/vagrant
cat .profile | grep make\ init && echo "Installed" || echo     "cd /vagrant; make init" >> .profile