#!/bin/bash

#echo "========== create cookbooks.tgz =========="
#cd cookbooks/ && tar -zcvf ../cookbooks.tgz . && cd ..
#cp cookbooks.tgz ~/Dropbox/Public/vagrant/
#sleep 1


echo "========== clean directory =========="
vagrant destroy
vagrant box remove vagrantpackage
rm -rf box
rm .vagrant
rm Vagrantfile


echo "========== create box =========="
cp Vagrantfile_create Vagrantfile
vagrant up
sleep 1



echo "========== package the box =========="
#rm Vagrantfile
#cp Vagrantfile_package Vagrantfile
#vagrant package --vagrantfile Vagrantfile
vagrant package --vagrantfile Vagrantfile_package


#echo "========== move the box =========="
mkdir box
mv package.box box
mv box/package.box ~/Dropbox/Public/vagrant


#echo "========== clean =========="
vagrant destroy
vagrant box remove vagrantpackage
rm Vagrantfile
rm .vagrant


echo "box created"