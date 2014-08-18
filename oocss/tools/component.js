/**
 *  Component creator
 *  This file help to create a new component, the main fonctionnality are made with make, and this file will just modify
 */
var common = require("./common.js");
var fs = require("fs.extra");


function main() {
    var componentName = process.argv[2];
    var componentPath = common.config.srcDir + 'components/' + componentName;
    addComponentName(componentPath, componentName);
}

function addComponentName(dir, componentName) {
    var dirContent = fs.readdirSync(dir);
    dirContent.forEach(function (file) {
        var filePath = dir + "/" + file;
        var stats = fs.statSync(filePath);
        if(stats.isDirectory()) {
            addComponentName(filePath, componentName);
        } else {
            var fileContent = fs.readFileSync(filePath, 'utf8')
                    .replace(/\{\{componentName\}\}/g,componentName) //normal replace
                    .replace(/\{\{ComponentName\}\}/g,componentName.charAt(0).toUpperCase() + componentName.slice(1));

            fs.writeFileSync(filePath, fileContent, 'utf8');
        }
    });
}

main();