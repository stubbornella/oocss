#!/bin/bash

# This file help to create a new repository into our github account Stubbornella
# Usage : sh createproject.sh <project name> <username>
# Example : sh createproject.sh "frba" "arnogues"

#test if curl is installed
command -v curl >/dev/null 2>&1 || { echo >&2 "This script requires curl but it's not installed.  Aborting."; exit 1; }


echo "create github repository"
curl -XPOST https://api.github.com/orgs/Stubbornella-Co/repos -u "${2}" -d "{\"name\":\"$1\",\"description\":\"project $1\", \"private\":true}"


echo "create project folder"
#mkdir ${TMPFOLDER}
# create tmp directory
rm -rf createrepotempfolder
TMPFOLDER=`mktemp -d /tmp/createrepotempfolder-XXXX`


echo ${TMPFOLDER}
echo "copy files from oocss folder"
rm oocss/.vagrant
rm -rf oocss/build
cp -R oocss/. ${TMPFOLDER}
cd ${TMPFOLDER}

echo "push files of the project to github"
git init
git add .
git commit -m 'add oocss files'
git remote add origin git@github.com:Stubbornella-Co/$1.git
git push -u origin master


#delete folder tmp
rm -rf ${TMPFOLDER}
echo "Project created and filled with oocss content"
