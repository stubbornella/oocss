#!/bin/bash

var="../testvagrant"

echo "====== start test ======"
cd ${var}
vagrant destroy
vagrant box remove stubbornella
rm -rf ${var}
mkdir ${var}
cp -R ../bootstrap/. ${var}
cd ${var}
rm .vagrant
echo "====== Start VM ======"
vagrant up
echo "====== Access to VM ======"
vagrant ssh
echo "====== End of test ======"